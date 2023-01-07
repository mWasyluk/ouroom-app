import '../utils/websocket.js'

import AppWelcome from './AppWelcome';
import Chat from './chat/Chat';
import Conversation from '../models/Conversation';
import ConversationService from '../services/ConversationService';
import ConversationsList from './conversations/ConversationsList';
import Message from '../models/Message';
import React from 'react';
import WebSocketConnection from '../utils/websocket.js';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            setUserStatus: props.setUserStatus,
            conversations: [],
            targetConversation: null
        }

        this.setConversations();
    }

    setConversations = async () => {
        const conversations = await ConversationService.getUserConversations()
        if (conversations) {
            this.setState({ conversations: conversations });
        }
        else this.setState({ conversations: [] });
    }

    updateConversation = (newState) => {
        const conversations = this.state.conversations;
        const toUpdate = conversations.filter(conv => conv.id === newState.id)[0];
        if (toUpdate) {
            const index = conversations.indexOf(toUpdate);
            conversations[index] = newState;
        }
        this.setState({ conversations: conversations });
    }

    subsciptionCallback = (plainMessage) => {
        let message = new Message(JSON.parse(plainMessage.body))

        const toUpdate = this.state.conversations.filter((conv) => conv.id === message.conversationId)[0];
        if (!toUpdate) {
            console.warn("Received a message that could not be applied to any existing conversation.")
            return;
        }
        else {
            toUpdate.messages.unshift(message);
            this.updateConversation(toUpdate);
        }
    }

    connectionStatusChangeCallback = (isConnected) => {
        if (isConnected)
            this.state.setUserStatus('online')
        else
            this.state.setUserStatus('offline')
    }

    async handleConversationSelection(conversation) {
        let messages = await ConversationService.getConversationMessages(conversation.id);
        let target = this.state.conversations
            .filter(conv => conv.id === conversation.id)[0]
        if (messages)
            target.messages = messages;
        else
            target.messages = []
        this.setState({ targetConversation: new Conversation(target) })
    }

    render() {
        return (
            <div className="logged" style={this.props.styles}>
                <WebSocketConnection topicId={this.state.user.profile.id} subscriptionCallback={this.subsciptionCallback.bind(this)} statusChangeCallback={this.connectionStatusChangeCallback.bind(this)} />
                <ConversationsList user={this.state.user} conversations={this.state.conversations} select={this.handleConversationSelection.bind(this)} />
                {this.state.targetConversation ?
                    <Chat user={this.state.user} conversation={this.state.targetConversation} updateConversation={this.updateConversation.bind(this)}></Chat> :
                    <AppWelcome />}
            </div >

        )
    }
}