import '../App.css'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import React from 'react';
import { v4, v5 } from 'uuid'

const serverUrl = 'http://localhost:8080/msender';

export default class Chat extends React.Component {
    stompClient;

    constructor(props) {
        super(props)
        const ws = new SockJS(serverUrl);
        this.stompClient = Stomp.over(ws);
        this.stompClient.connect({}, () => {
            this.stompClient.subscribe('/conversations', (message) => {
                if (message.body) {
                    const mess = JSON.parse(message.body);
                    this.setState({ messages: [...this.state.messages, mess] });
                }
            });
        });
    }

    state = {
        messages: [],
    }

    handleFormSubmit(e) {
        e.preventDefault();
        let message = {
            id: v4(),
            author: e.target[0].value,
            content: e.target[1].value
        }
        this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    }

    render() {
        let messages = this.state.messages.map(message =>
            <p key={message.id}><strong>{message.author}: </strong>{message.content}</p>
        )
        return (
            <div >
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