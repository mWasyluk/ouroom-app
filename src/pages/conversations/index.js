import './style.css';

import { conversationMessagesPageSize, getConversationMessages } from 'api-services/messagesApi';
import { useEffect, useRef, useState } from 'react';

import ContentBar from './_components/ContentBar';
import Conversation from 'models/Conversation';
import ConversationPageLoading from './_components/ConversationPageLoading';
import Message from 'models/Message';
import MessagesGroup from './_components/MessagesGroup';
import { getConversationWithMessagesById } from 'api-services/conversationsApi';
import { useAccount } from 'contexts/account/AccountProvider';
import { useAuth } from 'contexts/auth/AuthProvider';
import { useParams } from 'react-router';
import { useWebsocket } from 'contexts/websocket/websocket';

function ConversationPage() {
    const { token } = useAuth();
    const { profile } = useAccount();

    const { id } = useParams();
    const idRef = useRef({});

    const { stompClient } = useWebsocket();
    const subRef = useRef(false)

    const [currentConversation, setCurrentConversation] = useState();
    const messagesRef = useRef(currentConversation?.messages);

    // TODO: useReactQuery
    if (id !== idRef.current) {
        idRef.current = id;
        setCurrentConversation(null);
        getConversationWithMessagesById(token, { id }).then(conversation => {
            setCurrentConversation(conversation);
        });
    }

    if (!subRef.current && currentConversation && stompClient) {
        const handleNewMessage = (stompMessage) => {
            const recaived = new Message(JSON.parse(stompMessage.body));
            if (recaived.conversation.id === id) {
                setCurrentConversation(new Conversation({ ...currentConversation, messages: [recaived, ...messagesRef.current] }));
            }
        }

        subRef.current = stompClient.subscribe(`/topic/messages/${profile.id}`, handleNewMessage);
    }

    const handleScroll = async (e) => {
        let isOnTop = e.target.scrollHeight + e.target.scrollTop === e.target.clientHeight;
        if (!isOnTop) return;

        const messages = await fetchNextMessages();
        if (!messages.length) return;

        const resultConversation = {
            ...currentConversation,
            messages: [
                ...currentConversation.messages,
                ...messages]
        };
        setCurrentConversation(new Conversation(resultConversation));
    }

    const fetchNextMessages = async () => {
        const requiredPage = parseInt(currentConversation.messages.length / conversationMessagesPageSize, 10);
        const messages = await getConversationMessages(token, currentConversation.id, requiredPage)

        if (!messages) return [];

        let filtered = messages.filter(message =>
            currentConversation.messages.filter((m) =>
                m.id === message.id).length === 0
        );

        return filtered;
    };

    useEffect(() => {
        messagesRef.current = currentConversation?.messages;
    }, [currentConversation])

    useEffect(() => {
        return () => {
            subRef.current?.unsubscribe();
            subRef.current = false;
        }
    }, [id])

    if (!currentConversation)
        return <ConversationPageLoading />;

    return (
        <div className='conversation-chat'>
            <div className="chat-messages" onScroll={handleScroll}>
                {currentConversation.messagesGroups.map(group =>
                    <MessagesGroup key={group.id} sender={group.sender} messages={group.messages} />)}
            </div>
            <ContentBar targetConversationId={currentConversation.id} />
        </div>
    )
}

export default ConversationPage;
