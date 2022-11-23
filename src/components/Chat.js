import '../Root.css'
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
        channels: null,
        messages: [],
    }

    constructor(props) {
        super(props)

        // this.connectStomp();
    }

    connectStomp(channel) {
        this.stompClient = Stomp.over(() => new SockJS(serverUrl));
        this.stompClient.connect(
            {},
            () => this.stompOnConnectCallBack(channel),
            (err) => this.stompErrorCallBack(err)
        );
        this.stompClient.onWebSocketClose = this.stompOnCloseCallBack
    }

    stompOnConnectCallBack(channel) {
        console.log("WebSocket is connected.")
        this.setState({ isConnected: true });
        this.stompClient.subscribe(
            '/conversations.' + channel,
            (message) => this.stompSubscriptionCallBack(message));
        this.setState({ channel: channel })
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

    handleConnectToChannel(e) {
        e.preventDefault();

        let channel = e.target[0].value;

        this.connectStomp(channel);
    }

    // TODO: Check if stompClient is null
    handleSendMessage(e) {
        e.preventDefault();

        let author = e.target[0].value
        let target = this.state.channel;
        let content = e.target[1].value
        if (target) {
            let message = {
                id: v4(),
                author: author,
                target: target,
                content: content
            }

            e.target[1].value = ''
            this.stompClient.send("/app/chat/", {}, JSON.stringify(message));
        } else {
            console.log("Channel is null");
        }
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
                <form className='channel' onSubmit={this.handleConnectToChannel.bind(this)}>
                    <input className='input input-channel' type='text' placeholder='Nazwa kanału'></input >
                    <button type="submit">Wyślij</button>
                </form>

                <form className='chat' onSubmit={this.handleSendMessage.bind(this)}>
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