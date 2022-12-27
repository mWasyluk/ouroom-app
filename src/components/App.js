import '../styles/App.css'
import React from 'react';
import Chat from './conversations/Chat';
import ConversationsList from './conversations/ConversationsList';
import '../utils/websocket.js'
import WebSocketConnection from '../utils/websocket.js';
import Message from '../domains/Message';
import AppWelcome from './AppWelcome';
import ConversationService from '../services/ConversationService';

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
        let messages = await ConversationService.getConversationMessages(conversation.id);
        let target = this.state.conversations
            .filter(conv => conv.id === conversation.id)[0]
        if (messages)
            target.messages = messages;
        else
            target.messages = []
        this.setState({ targetConversation: target })
    }

    render() {
        return (
            <div className="logged" style={this.props.styles}>
                <WebSocketConnection topicId={this.state.user.profile.id} subscriptionCallback={this.subsciptionCallback.bind(this)} statusChangeCallback={this.connectionStatusChangeCallback.bind(this)} />
                <ConversationsList user={this.state.user} conversations={this.state.conversations} select={this.handleConversationSelection.bind(this)} />
                {this.state.targetConversation ?
                    <Chat user={this.state.user} conversation={this.state.targetConversation} ></Chat> :
                    <AppWelcome />}
            </div >

        )
    }
}