import './style.css'

import { useEffect, useRef, useState } from 'react';

import Conversation from 'models/Conversation';
import ConversationsListItem from "./_components/ConversationsListItem";
import ConversationsListLoading from './_components/ConversationsListLoading';
import NewConversationButton from "./_components/NewConversationButton";
import { getActiveConversations } from 'api-services/conversationsApi';
import { useAccount } from 'contexts/account/AccountProvider';
import { useAuth } from 'contexts/auth/AuthProvider';
import { useWebsocket } from 'contexts/websocket/websocket';
import { useWindowDimensions } from 'utils/window-utils';

const ConversationsList = () => {
    const { isTight } = useWindowDimensions();
    const { token } = useAuth();
    const { profile } = useAccount();
    const [isLoading, setIsLoading] = useState(true);
    const [conversations, setConversations] = useState([]);

    // TODO: useReactQuery();
    if (isLoading)
        getActiveConversations(token).then(conversations => {
            setConversations(conversations.map(c => new Conversation(c)).reverse());
            setIsLoading(false);
        })

    const { stompClient } = useWebsocket();
    const subRef = useRef(false)

    if (stompClient?.connected && !subRef.current) {
        subRef.current = stompClient.subscribe(
            '/topic/conversations/' + profile.id,
            (stompMessage) => {
                const recaived = new Conversation(JSON.parse(stompMessage.body));
                setConversations(convs => [recaived, ...convs]);
            }
        );
    }

    useEffect(() => {
        return () => {
            subRef.current && subRef.current.unsubscribe();
        }
    }, [])

    return (
        <div className={`conversations-list${isTight ? ' mini' : ''}`}>
            <NewConversationButton mini={isTight} />
            {isLoading
                ? <ConversationsListLoading />
                : conversations && conversations.map(conversation =>
                    <ConversationsListItem key={conversation.id} mini={isTight} conversation={conversation} />
                )}
        </div>
    )

}

export default ConversationsList;