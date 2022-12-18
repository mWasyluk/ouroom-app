import './Chat.css'
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import Message from '../domains/Message';
import { postConversationMessage } from '../utils/fetch';

// const serverHost = 'localhost'
const serverHost = '192.168.0.24'
const serverUrl = 'http://' + serverHost + ':8080/ouroom';

export default class Chat extends React.Component {
    stompClient;

    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            setUserStatus: props.setUserStatus,
            isConnected: false,
            conversation: props.conversation
        }

        this.connectStomp()
    }

    componentDidUpdate() {
        if (this.state.isConnected) this.state.setUserStatus('online')
        else this.state.setUserStatus('offline')
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.conversation && (nextProps.conversation !== prevState.conversation ||
            nextProps.conversation.messages !== prevState.conversation.messages)) {
            return ({ conversation: nextProps.conversation })
        }
        return null
    }

    connectStomp() {
        this.stompClient = Stomp.over(() => new SockJS(serverUrl));
        this.stompClient.debug = () => { }

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
            // '/conversations.' + this.state.user.id,
            '/topic/03a3c0d9-23ec-4fb1-9ddc-b927bf341381',
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
        return message.sender !== this.state.user.id
    }

    async stompSubscriptionCallBack(subscriptionMessage) {
        if (subscriptionMessage.body) {
            let message = new Message(JSON.parse(subscriptionMessage.body));

            // TODO: send to correct conversation if its different than selected
            this.state.conversation.messages.unshift(message);
            this.forceUpdate();
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

        let content = e.target[0].value
        if (!this.state.conversation) {
            console.error('Select Conversation before sending the Message.')
            return;
        } if (!content) {
            console.error('Empty Message cannot be sent.')
            return;
        }

        postConversationMessage(this.state.conversation.id, content)
        e.target[0].value = ''
    }

    render() {
        let conversation = this.state.conversation;
        let messagesList = null
        if (conversation) {
            let messages = conversation ? conversation.messages : null
            messagesList = messages.map(message => {
                let positionClass = message.sender === this.state.user.id ?
                    'sent' : 'received'
                return <div className={positionClass} key={message.id}>{message.content}</div>
            }
            )
        }

        return (
            <div className='chat'>
                <form className='content-bar' onSubmit={this.handleSendMessage.bind(this)}>
                    <input className='content' type="text" placeholder="Treść wiadomości" />
                    <button className='send' type="submit"><AiOutlineSend size={'2.5em'} /></button>
                </form>
                <div className='messages'>
                    {messagesList}
                </div>
            </div>
        )
    }
}