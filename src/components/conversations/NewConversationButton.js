import './conversation-style.css'

import { BsPlusCircle } from 'react-icons/bs'
import NewConversationPopup from './NewConversationPopup'
import { useState } from 'react'

const NewConversationButton = (props) => {
    const {
        userId = ''
    } = props

    const [displayPopup, setDisplayPopup] = useState(false);

    const handleSwitch = () => {
        setDisplayPopup(!displayPopup);
    }

    return (
        <>
            <div className='new-conversation-button' onClick={handleSwitch}>
                <BsPlusCircle size={'30px'} />
                <span>Nowa konwersacja</span>
            </div>
            {displayPopup
                ? <NewConversationPopup dismissPopup={handleSwitch} userId={userId} />
                : null}
        </>
    )
}

export default NewConversationButton;