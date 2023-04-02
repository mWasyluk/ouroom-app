import ContentBar from './ContentBar';
import MessagesGroup from './MessagesGroup';
import React from 'react'

function ConversationPageLoading() {
    return (
        <div className='conversation-chat'>
            <MessagesGroup />
            <MessagesGroup site={'right'} />
            <MessagesGroup />
            <MessagesGroup site={'right'} />
            <MessagesGroup />
            <MessagesGroup site={'right'} />
            <MessagesGroup />
            <MessagesGroup site={'right'} />
            <MessagesGroup />
            <MessagesGroup site={'right'} />
            <MessagesGroup />
            <MessagesGroup site={'right'} />
            <MessagesGroup />
            <MessagesGroup site={'right'} />
            <ContentBar />
        </div>
    )
}

export default ConversationPageLoading;