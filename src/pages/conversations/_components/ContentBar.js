import './ContentBar.css';

import { BsEmojiLaughingFill } from 'react-icons/bs';
import { MdSend } from 'react-icons/md';
import { pushSimpleInfoTopModal } from 'utils/modal-utils';
import { sendConversationMessage } from 'api-services/messagesApi';
import { useAuth } from 'contexts/auth/AuthProvider';
import { useState } from 'react';

function ContentBar({ targetConversationId }) {
    const { token } = useAuth();
    const [content, setContent] = useState('');
    const canSendMessage = content ? true : false;
    const sendButtonTitle = canSendMessage ? '' : 'Nie można wysłać pustej wiadomości'

    const submitMessageForm = (e) => {
        e.preventDefault();
        sendConversationMessage(token, targetConversationId, { content: content }).catch(err => {
            pushSimpleInfoTopModal(
                <span>wiadomość nie mogła zostać wysłana. Odśwież stronę i spróbuj ponownie.</span>
            )
            console.error("Sending message error:", err.message)
        })
        setContent('');
    }

    return (
        <form className='content-bar' onSubmit={submitMessageForm}>
            <button type='button'><BsEmojiLaughingFill className={'button-icon'} /></button>
            <input type={'text'} className={'our-input'} placeholder={'Treść wiadomości...'} value={content} onChange={(e) => setContent(e.target.value)}></input>
            <button disabled={!canSendMessage} title={sendButtonTitle} type='submit'><MdSend className='button-icon' /></button>
        </form>
    )
}

export default ContentBar;