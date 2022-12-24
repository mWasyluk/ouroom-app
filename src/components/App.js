import '../styles/App.css'
import React from 'react';
import Chat from './conversations/Chat';
import ConversationsList from './conversations/ConversationsList';
import { getConversationMessages, getUserConversations } from '../utils/fetch'
import '../utils/websocket.js'
import WebSocketConnection from '../utils/websocket.js';
import Message from '../domains/Message';
import AuthService from '../services/AuthService';

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            setUserStatus: props.setUserStatus,
            conversations: [],
            targetConversation: null
        }

        getUserConversations(AuthService.getAuthToken()).then(conversations =>
            this.setState({ conversations: conversations })
        );
    }

    subsciptionCallback = (plainMessage) => {
        let message = new Message(JSON.parse(plainMessage.body))

        this.state.conversations.filter((conv) => conv.id === message.conversationId)[0]
            .messages.unshift(message);
        this.forceUpdate()
    }

    connectionStatusChangeCallback = (isConnected) => {
        if (isConnected)
            this.state.setUserStatus('online')
        else
            this.state.setUserStatus('offline')
    }

    async handleConversationSelection(conversation) {
        let messages = await getConversationMessages(AuthService.getAuthToken(), conversation.id);
        let target = this.state.conversations
            .filter(conv => conv.id === conversation.id)[0]
        target.messages = messages;
        this.setState({ targetConversation: target })
    }

    render() {
        return (
            <div className="logged" style={this.props.styles}>
                <WebSocketConnection topicId={this.state.user.profile.id} subscriptionCallback={this.subsciptionCallback.bind(this)} statusChangeCallback={this.connectionStatusChangeCallback.bind(this)} />
                <ConversationsList conversations={this.state.conversations} select={this.handleConversationSelection.bind(this)} />
                <Chat user={this.state.user} conversation={this.state.targetConversation} authToken={this.state.authToken}></Chat>
            </div >

        )
    }
}