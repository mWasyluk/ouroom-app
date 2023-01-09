import React from 'react';
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { apiUrl } from './server-info';

const serverUrl = apiUrl + '/ouroom';

export default class WebSocketConnection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            topicId: props.topicId,
            subscriptionMessageCallback: props.subscriptionMessageCallback,
            subscriptionConversationCallback: props.subscriptionConversationCallback,
            statusChangeCallback: props.statusChangeCallback
        }
    }

    componentDidMount() {
        this.connectStomp();
    }

    connectStomp = () => {
        this.stompClient = Stomp.over(() => new SockJS(serverUrl));
        this.stompClient.debug = () => { }

        this.stompClient.connect(
            {},
            () => this.stompOnConnectCallBack(),
            (err) => this.stompErrorCallBack(err)
        );
        this.stompClient.onWebSocketClose = this.stompOnCloseCallBack
    }

    stompOnConnectCallBack = () => {
        this.state.statusChangeCallback(true)
        this.stompClient.subscribe(
            '/topic/messages/' + this.state.topicId,
            (message) => this.state.subscriptionMessageCallback(message)
        );
        this.stompClient.subscribe(
            '/topic/conversations/' + this.state.topicId,
            (conversation) => this.state.subscriptionConversationCallback(conversation)
        );
    }

    stompOnCloseCallBack = () => {
        setTimeout(() => {
            this.state.statusChangeCallback(false)
            console.log("Connection has been closed.", '\nReconnecting...');
            this.connectStomp();
        }, 2500);
    }

    // async stompSubscriptionCallBack(subscriptionMessage) {
    //     if (subscriptionMessage.body) {
    //         let message = new Message(JSON.parse(subscriptionMessage.body));

    //         // TODO: send to correct conversation if its different than selected
    //         this.state.conversation.messages.unshift(message);
    //         this.forceUpdate();
    //     }
    // }


    stompErrorCallBack = (err) => {
        setTimeout(() => {
            this.state.statusChangeCallback(false)
            console.log("Connection error: ", err.reason, '\nReconnecting...');
            this.connectStomp();
        }, 2500);
    }

    render() {
        return <></>
    }
}