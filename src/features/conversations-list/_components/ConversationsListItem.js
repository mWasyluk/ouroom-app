import { Link } from 'react-router-dom';

const ConversationListItem = ({ conversation, mini }) => {
    const itemClassName = `conversations-list-item${mini ? ' mini' : ''}`;

    if (!conversation)
        return (
            <a href='/#' className={itemClassName}>
                <label className='conversation-button our-loading-bg'>
                    <img alt={""} className='item-icon' width={40} height={40} />
                    <span className="item-description name">{' '}</span>
                </label>
            </a>
        )

    return (
        <Link to={`/conversations/${conversation.id}`} className={itemClassName}>
            <input type="radio" className='conversation-input' id={conversation.id} name={'conversation'} />
            <label className="conversation-button" htmlFor={conversation.id}>
                <img alt={conversation.name + "conversation image"} className={'item-icon'} src={conversation.avatarUrl} width={40} height={40}></img>
                <span className="item-description name">{conversation.name}</span>
            </label>
        </Link>
    )
}

export default ConversationListItem;