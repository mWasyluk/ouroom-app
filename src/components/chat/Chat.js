import '../../styles/Chat.css'

import { AiOutlineSend } from 'react-icons/ai';
import ConversationService from '../../services/ConversationService';
import MessagesGroup from './MessagesGroup';
import React from 'react';

export default class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            conversation: props.conversation,
            updateConversation: props.updateConversation,
            page: 0,
            isScrollBlocked: false,
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
            this.setState({ isScrollBlocked: true })

            let requiredPage = parseInt(this.state.conversation.messages.length / messagesInPage, 10);
            let messages = await ConversationService.getConversationMessages(this.state.conversation.id, requiredPage);

            if (messages) {
                let filtered = messages.filter(message =>
                    this.state.conversation.messages.filter((m) => m.id === message.id).length === 0
                );

                if (filtered.length > 0) {
                    const conversation = this.state.conversation;
                    conversation.messages = [...this.state.conversation.messages, ...filtered];
                    this.state.updateConversation(conversation);
                };
            }
            this.setState({ isScrollBlocked: false })
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

        ConversationService.sendConversationMessage(this.state.conversation.id, content)

        e.target[0].value = ''
    }

    render() {
        const messagesGroups = this.state.conversation.messagesGroups;
        let groupsOfMessagesView = []
        if (messagesGroups.length) {
            groupsOfMessagesView = messagesGroups.map((group, index) => {
                const site = group.sender.id === this.state.user.profile.id ? 'right' : 'left';
                return <MessagesGroup key={index} messages={group.messages} sender={group.sender} site={site}></MessagesGroup>
            })
        }
        const style = this.state.isScrollBlocked ? { overflow: 'hidden' } : {};
        return (
            <div className='chat' style={style}>
                <form className='content-bar' onSubmit={this.sendMessage.bind(this)}>
                    <input className='content' type="text" placeholder="Treść wiadomości" />
                    <button className='send' type="submit"><AiOutlineSend size={'2.5em'} /></button>
                </form>
                <div onScroll={this.handleScroll} className='messages'>
                    {groupsOfMessagesView}
                </div>
            </div>
        )
    }
}