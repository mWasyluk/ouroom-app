import './Chat.css'
import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { getConversationMessages, postConversationMessage } from '../utils/fetch';

export default class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            conversation: props.conversation,
            authToken: props.authToken,
            page: 0
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.conversation && (nextProps.conversation !== prevState.conversation ||
            nextProps.conversation.messages !== prevState.conversation.messages)) {
            if (prevState.conversation && (prevState.conversation.id !== nextProps.conversation.id))
                return ({ conversation: nextProps.conversation, page: 0 })
            return ({ conversation: nextProps.conversation })
        }
        return null
    }

    handleScroll = async (e) => {
        const isTop = e.target.scrollHeight + e.target.scrollTop === e.target.clientHeight;
        const messagesInPage = 30;

        if (isTop) {
            let requiredPage = parseInt(this.state.conversation.messages.length / messagesInPage, 10);
            let messages = await getConversationMessages(this.state.authToken, this.state.conversation.id, requiredPage);

            let filtered = messages.filter(message =>
                this.state.conversation.messages.filter((m) => m.id === message.id).length === 0
            );

            if (filtered.length > 0) {
                this.state.conversation.messages = [...this.state.conversation.messages, ...filtered];
                this.forceUpdate()
            };
        }
    }

    sendMessage(e) {
        e.preventDefault();

        let content = e.target[0].value
        if (!this.state.conversation) {
            console.error('Select Conversation before sending the Message.')
            return;
        } if (!content) {
            console.error('Empty Message cannot be sent.')
            return;
        }

        postConversationMessage(this.state.authToken, this.state.conversation.id, content)
        e.target[0].value = ''
    }

    render() {
        let conversation = this.state.conversation;
        let messagesList = []
        if (conversation) {
            messagesList = conversation.messages.map(message => {
                let positionClass = message.sender === this.state.user.profile.id ?
                    'sent' : 'received'
                return <div className={positionClass} key={message.id}>{message.content}</div>
            });
        }

        return (
            <div className='chat'>
                <form className='content-bar' onSubmit={this.sendMessage.bind(this)}>
                    <input className='content' type="text" placeholder="Treść wiadomości" />
                    <button className='send' type="submit"><AiOutlineSend size={'2.5em'} /></button>
                </form>
                <div onScroll={this.handleScroll} className='messages'>
                    {messagesList}
                </div>
            </div>
        )
    }
}