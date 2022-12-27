import MessagesGroupAvatar from "./MessagesGroupAvatar";

const MessagesGroup = (
    props = { messages: [], sender: {}, site: 'left' | 'right' }
) => {
    let messagesViewList = [];
    if (props.messages.length) {
        messagesViewList = props.messages.map((message) =>
            <span key={message.id} className='group-message'>{message.content}</span>
        );
    }

    return (
        <div className={"messages-group " + props.site + "-group"}>
            <div className="group-top">
                <span>{props.sender.firstName + ' ' + props.sender.lastName}</span>
            </div>
            <div className="group-bottom">
                <div className="group-messages">
                    {messagesViewList}
                </div>
                <MessagesGroupAvatar className='group-avatar' url={props.sender.avatar.imageUrl}></MessagesGroupAvatar>
            </div>
        </div>
    )
}

export default MessagesGroup;