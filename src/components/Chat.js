import './Chat.css'
import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { postConversationMessage } from '../utils/fetch';

export default class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            conversation: props.conversation
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.conversation && (nextProps.conversation !== prevState.conversation ||
            nextProps.conversation.messages !== prevState.conversation.messages)) {
            return ({ conversation: nextProps.conversation })
        }
        return null
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

        postConversationMessage(this.state.conversation.id, content)
        e.target[0].value = ''
    }

    render() {
        let conversation = this.state.conversation;
        let messagesList = []
        if (conversation) {
            messagesList = conversation.messages.map(message => {
                let positionClass = message.sender === this.state.user.id ?
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
                <div className='messages'>
                    {messagesList}
                </div>
            </div>
        )
    }
}