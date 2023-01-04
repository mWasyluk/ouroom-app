import MessagesGroupAvatar from "./MessagesGroupAvatar";

const MessagesGroup = (props) => {
    const {
        messages = [],
        sender = {},
        site = 'left'
    } = props

    let messagesViewList = [];
    if (messages.length) {
        messagesViewList = messages.map((message) =>
            <span key={message.id} className='group-message'>{message.content}</span>
        );
    }

    return (
        <div className={"messages-group " + site + "-group"}>
            <div className="group-top">
                <span>{sender.firstName + ' ' + sender.lastName}</span>
            </div>
            <div className="group-bottom">
                <div className="group-messages">
                    {messagesViewList}
                </div>
                <MessagesGroupAvatar url={sender.avatar.imageUrl}></MessagesGroupAvatar>
            </div>
        </div>
    )
}

export default MessagesGroup;