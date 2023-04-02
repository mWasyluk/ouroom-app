import { BsPlus } from 'react-icons/bs'
import NewConversationPopup from './NewConversationPopup'
import { useState } from 'react'

const NewConversationButton = (props) => {
    const {
        userId = '',
        mini
    } = props

    const [displayPopup, setDisplayPopup] = useState(false);

    const handleSwitch = () => {
        setDisplayPopup(!displayPopup);
    }

    return (
        <>
            <div className={`conversations-list-item${mini ? ' mini' : ''}`} onClick={handleSwitch}>
                <button className='new-conversation-button'>
                    <BsPlus className={'item-icon'} size={'30px'} />
                    <span className={'item-description'}>Nowa konwersacja</span>
                </button>
            </div>
            {displayPopup
                ? <NewConversationPopup dismissPopup={handleSwitch} userId={userId} />
                : null}
        </>
    )
}

export default NewConversationButton;