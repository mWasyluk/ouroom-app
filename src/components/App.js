import './App.css'
import { Component } from "react";
import Chat from './Chat';
import ConversationsList from './ConversationsList';
import { getConversationMessages, getUserConversations } from '../utils/fetch'
import '../utils/websocket.js'
import WebSocketConnection from '../utils/websocket.js';
import Message from '../domains/Message';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            conversations: [],
            user: props.user,
            setUser: props.setUser,
            setUserStatus: props.setUserStatus,
            targetConversation: null
        }

        getUserConversations().then(conversations =>
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
        let messages = await getConversationMessages(conversation.id);
        let target = this.state.conversations
            .filter(conv => conv.id === conversation.id)[0]
        target.messages = messages;
        this.setState({ targetConversation: target })
    }

    login = async (e) => {
        e.preventDefault();

        // const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        // const userId = e.target[0].value

        // if (uuidRegex.test(userId)) {
        //     let username = await getUsernameById(userId)
        //     let user = {
        //         id: userId,
        //         name: username
        //     }
        //     this.setState({ user: user })
        //     this.state.setUser(user);
        // } else {
        //     throw new Error("Wprowadzono nieprawidłowy UUID")
        // }
    }

    render() {
        const login = (
            <div className="login">
                <form className="popup" onSubmit={this.login.bind(this)}>
                    <span>Zaloguj się do<strong>OurRoom!</strong></span>
                    <input type="text" name="user-id" id="user-id" placeholder="ID użytkownika" />
                    <button type="submit" id="submit">Zaloguj się</button>
                </form>
            </div>
        )

        const logged = (
            <div className="logged" >
                <WebSocketConnection topicId={this.state.user.id} subscriptionCallback={this.subsciptionCallback.bind(this)} statusChangeCallback={this.connectionStatusChangeCallback.bind(this)} />
                <ConversationsList conversations={this.state.conversations} select={this.handleConversationSelection.bind(this)} />
                <Chat user={this.state.user} conversation={this.state.targetConversation}></Chat>
            </div >
        )

        return (
            <div className="App">
                {this.state.user ? logged : login}
            </div>
        )
    }
}