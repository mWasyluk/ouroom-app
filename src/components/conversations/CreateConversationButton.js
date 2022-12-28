import { BsPlusCircle } from 'react-icons/bs'
import '../../styles/popup.css'
import '../../styles/ConversationsList.css'
import { useState } from 'react'
import UUID from '../../utils/uuid'
import ConversationService from '../../services/ConversationService'

const CreateConversationButton = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [fields, setFields] = useState(1)

    const addField = () => {
        setFields(fields + 1);
    }

    const generateFields = () => {
        let inputFields = []
        for (let i = 0; i < fields; i++) {
            const id = 'field-' + i;
            inputFields.push(<input type='text' id={id} key={id} placeholder='Numer ID...'></input>)
        }
        return inputFields;
    }

    const handleCreateConversation = async (e) => {
        let ids = []
        ids.push({ id: props.user.profile.id })
        for (let i = 0; i < fields; i++) {
            const id = document.getElementById('field-' + i).value.trim();
            if (UUID.validate(id))
                ids.push({ id: id })
            else
                console.warn('ID', id, 'is not a valid UUID.')
        }
        if (ids.length === fields + 1) {
            console.log('IDs are correct. Requesting creation')
            const response = await ConversationService.createConversation(ids);
            if (response !== null) {
                window.location.reload();
            }
        }
    }

    const handleSwitch = (e) => {
        const targetClassName = e.target.className;
        const currentTargetClassName = e.currentTarget.className;
        if (targetClassName === 'popup-background' || currentTargetClassName === "new-conversation-button")
            setIsClicked(!isClicked);
        if (targetClassName === 'popup-background')
            setFields(1)
    }

    return (
        <>
            <div className='new-conversation-button' onClick={handleSwitch}>
                <BsPlusCircle size={'30px'}></BsPlusCircle>
                <span>Nowa konwersacja</span>
            </div>
            <div className='popup-background' onClick={handleSwitch} style={{ display: isClicked ? 'initial' : 'none' }}>
                <div className='popup-form white08'>
                    <span>Wprowadź identyfikator(y) osób, które będą miały dostęp do konwersacji:</span>
                    {generateFields()}
                    <BsPlusCircle style={{ alignSelf: 'center' }} onClick={addField}></BsPlusCircle>
                    <button type='submit' onClick={handleCreateConversation}>Stwórz konwersację</button>
                </div>
            </div>
        </>
    )
}

export default CreateConversationButton;