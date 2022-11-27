import '../Root.css'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import React from 'react';
import { v4 } from 'uuid'
import { getFriends } from '../utils/fetch';

// const serverHost = 'localhost'
const serverHost = '192.168.0.24'
const serverUrl = 'http://' + serverHost + ':8080/msender';

export default class Chat extends React.Component {
    stompClient;

    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            target: props.target,
            isConnected: false,
            conversations: props.conversations
        }

        this.connectStomp()
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if ((nextProps.conversations !== prevState.conversations &&
            nextProps.conversations.length >= prevState.conversations.length) ||
            nextProps.target !== prevState.target) {
            return ({ conversations: nextProps.conversations, target: nextProps.target })
        }
        return null
    }

    connectStomp() {

        this.stompClient = Stomp.over(() => new SockJS(serverUrl));
        this.stompClient.connect(
            {},
            () => this.stompOnConnectCallBack(),
            (err) => this.stompErrorCallBack(err)
        );
        this.stompClient.onWebSocketClose = this.stompOnCloseCallBack
    }

    stompOnConnectCallBack() {
        console.log("WebSocket is connected.")
        this.setState({ isConnected: true });
        this.stompClient.subscribe(
            '/conversations.' + this.state.user.id,
            (message) => this.stompSubscriptionCallBack(message));
    }

    stompOnCloseCallBack = () => {
        setTimeout(() => {
            this.setState({ isConnected: false });
            console.log("Connection has been closed.", '\nReconnecting...');
            this.connectStomp();
        }, 2500);
    }

    isIncomming = (message) => {
        return message.author !== this.state.user.id
    }

    async stompSubscriptionCallBack(subscriptionMessage) {
        if (subscriptionMessage.body) {
            const message = JSON.parse(subscriptionMessage.body);
            let friends = await getFriends();
            let friend;
            if (this.isIncomming(message)) {
                friend = friends
                    .filter(friend => friend.id === message.author)[0]
                message.author = friend.name
            } else {
                friend = friends
                    .filter(friend => friend.id === message.target)[0]
                message.author = this.state.user.name
            }

            let conversationToUpdate = this.state.conversations
                .filter(conv => conv.friend.id === friend.id)[0];
            if (conversationToUpdate) {
                let conversations = this.state.conversations
                let toUpdateIndex = conversations.indexOf(conversationToUpdate);

                conversations[toUpdateIndex].messages.push(message)
                this.setState({ conversations: conversations });

            } else {
                // TODO: find conversation with the friend (from Root), 
                // put the message there and push whole conversation to the state
            }

        }
    }

    stompErrorCallBack(err) {
        setTimeout(() => {
            console.log("Connection error: ", err.reason, '\nReconnecting...');
            this.connectStomp();
        }, 2000);
    }

    handleConnectToChannel(e) {
        e.preventDefault();

        let target = e.target[0].value;

        this.connectStomp(target);
    }

    // TODO: Check if stompClient is null
    handleSendMessage(e) {
        e.preventDefault();

        let author = this.state.user.id;
        let target = this.state.target.id;
        let content = e.target[0].value
        if (target && content) {
            let message = {
                id: v4(),
                author: author,
                target: target,
                content: content
            }

            this.stompClient.send("/app/chat/", {}, JSON.stringify(message));
            e.target[0].value = ''
        } else {
            console.log("target or content is null");
        }
    }

    render() {

        let conversation = this.state.conversations.filter(conversation =>
            conversation.friend === this.state.target
        )[0];
        let messagesList = null
        if (conversation) {
            let messages = conversation ? conversation.messages : null
            messagesList = messages.map(message =>
                <p key={message.id}><strong>{message.author}: </strong>{message.content}</p>
            )
        }

        console.log(this.state.conversations)

        let status = this.state.isConnected ?
            <p style={{ color: "green" }}>Jesteś online</p> :
            <p style={{ color: "red" }}>Jesteś offline</p>

        return (
            <div >
                {status}
                <form className='chat' onSubmit={this.handleSendMessage.bind(this)}>
                    <input className='input input-message' type="text" placeholder="Treść wiadomości" />
                    <button type="submit">Wyślij</button>
                </form>
                <div>
                    {messagesList}
                </div>
            </div>
        )
    }
}