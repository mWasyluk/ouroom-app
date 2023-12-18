import './MessagesGroup.css'
import 'styles/our-styles.css'

import MessagesGroupAvatar from './MessagesGroupAvatar';
import { useAccount } from 'contexts/account/AccountProvider';

let spaces = [];
for (let i = 0; i < 10; i++) {
    spaces.push(<span key={i}>&emsp;</span>);
}

const MessagesGroup = ({ sender, messages, site: siteProp }) => {
    const { profile } = useAccount();
    const site = siteProp || ((sender && profile.id === sender.id) ? 'right' : 'left');
    const isLoading = !(sender && messages);

    if (isLoading) {
        return (
            <div className={"messages-group " + site + "-group"}>
                <div className="group-top">
                    <span className='our-loading-bg our-loading-frame'>{spaces.slice(0, 7)}</span>
                </div>
                <div className="group-bottom">
                    <div className="group-messages">
                        <span className='group-message our-loading-bg'>{spaces}</span>
                    </div>
                    <MessagesGroupAvatar></MessagesGroupAvatar>
                </div>
            </div>
        )
    }

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
