import '../App.css'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import React from 'react';
import { v4 } from 'uuid'

// const serverHost = 'localhost'
const serverHost = '192.168.0.24'
const serverUrl = 'http://' + serverHost + ':8080/msender';

export default class Chat extends React.Component {
    stompClient;
    state = {
        isConnected: false,
        messages: [],
    }

    constructor(props) {
        super(props)

        this.connectStomp();
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
            '/conversations',
            (message) => this.stompSubscriptionCallBack(message));
    }

    stompOnCloseCallBack = () => {
        setTimeout(() => {
            this.setState({ isConnected: false });
            console.log("Connection has been closed.", '\nReconnecting...');
            this.connectStomp();
        }, 2500);
    }

    stompSubscriptionCallBack(message) {
        if (message.body) {
            const mess = JSON.parse(message.body);
            this.setState({ messages: [...this.state.messages, mess] });
        }
    }

    stompErrorCallBack(err) {
        setTimeout(() => {
            console.log("Connection error: ", err.reason, '\nReconnecting...');
            this.connectStomp();
        }, 2000);
    }

    // TODO: Check if stompClient is null
    handleFormSubmit(e) {
        e.preventDefault();
        let message = {
            id: v4(),
            author: e.target[0].value,
            content: e.target[1].value
        }
        e.target[1].value = ''
        this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    }

    render() {
        let messages = this.state.messages.map(message =>
            <p key={message.id}><strong>{message.author}: </strong>{message.content}</p>
        )

        let status = this.state.isConnected ?
            <p style={{ color: "green" }}>Jesteś online</p> :
            <p style={{ color: "red" }}>Jesteś offline</p>

        return (
            <div >
                {status}
                <form className='chat' onSubmit={this.handleFormSubmit.bind(this)}>
                    <input className='input input-username' type='text' placeholder='Nazwa użytkownika' ></input >
                    <input className='input input-message' type="text" placeholder="Treść wiadomości" />
                    <button type="submit">Wyślij</button>
                </form>
                <div>
                    {messages}
                </div>
            </div>
        )
    }
}