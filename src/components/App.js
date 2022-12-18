import './App.css'
import { Component } from "react";
import Chat from './Chat';
import ConversationsList from './ConversationsList';
import { getConversationMessages, getUserConversations } from '../utils/fetch'
import '../utils/websocket.js'
import WebSocketConnection from '../utils/websocket.js';
import Message from '../domains/Message';
import LoginForm from './LoginForm';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            conversations: [],
            user: props.user,
            setUser: props.setUser,
            authToken: '',
            setUserStatus: props.setUserStatus,
            targetConversation: null
        }

        getUserConversations().then(conversations =>
            this.setState({ conversations: conversations })
        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user !== prevState.user) {
            return ({ user: nextProps.user })
        }
        return null
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
        let messages = await getConversationMessages(conversation.id);
        let target = this.state.conversations
            .filter(conv => conv.id === conversation.id)[0]
        target.messages = messages;
        this.setState({ targetConversation: target })
    }

    setAccount = (account) => {
        this.state.setUser(account);
    }

    setAuthToken = (token) => {
        this.setState({ authToken: token })
    }

    render() {
        let view;
        if (!this.state.user)
            view = (
                <div className="login">
                    <LoginForm setAccount={this.setAccount} setAuthToken={this.setAuthToken} />
                </div>
            )
        else
            view = (
                <div className="logged" >
                    <WebSocketConnection topicId={this.state.user.profile.id} subscriptionCallback={this.subsciptionCallback.bind(this)} statusChangeCallback={this.connectionStatusChangeCallback.bind(this)} />
                    <ConversationsList conversations={this.state.conversations} select={this.handleConversationSelection.bind(this)} />
                    <Chat user={this.state.user} conversation={this.state.targetConversation}></Chat>
                </div >
            )

        return (
            <div className="App">
                {view}
            </div>
        )
    }
}