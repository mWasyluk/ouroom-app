import './NewConversationPopup.css'

import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'

import InputDropdown from 'features/profiles-selector/InputDropdown';
import ModalPortal from 'features/modals/ModalPortal';
import { ModalPositions } from 'features/modals/ModalPortal';
import ProfilesList from 'features/profiles-selector/ProfilesList';
import { createConversation } from 'api-services/conversationsApi';
import { pushSimpleInfoTopModal } from 'utils/modal-utils';
import { useAccount } from 'contexts/account/AccountProvider';
import { useAuth } from 'contexts/auth/AuthProvider';
import { useState } from 'react';

const addItemIcon = { iconElement: <FaPlusCircle />, color: '#009726' };
const removeItemIcon = { iconElement: <FaMinusCircle />, color: '#970000' }

const NewConversationPopup = (props) => {
    const {
        dismissPopup = () => { },
    } = props;

    const auth = useAuth();
    const account = useAccount();
    const [selectedProfiles, setSelectedProfiles] = useState([]);

    const selectProfile = (profile) => {
        setSelectedProfiles([...selectedProfiles, profile]);
    }

    const unselectProfile = (profile) => {
        const selectedAfter = selectedProfiles.filter(prof => prof.id !== profile.id);
        setSelectedProfiles(selectedAfter);
    }

    const unselectProfileById = (id) => {
        const toUnselect = selectedProfiles.filter(profile => profile.id === id)[0];
        unselectProfile(toUnselect);
    }

    const handleCreateConversation = async (e) => {
        e.preventDefault()

        let selectedProfilesIds = selectedProfiles.map(profile => { return { id: profile.id } });
        if (selectedProfilesIds.length <= 0) {
            pushSimpleInfoTopModal(
                <span>przed utworzeniem konwersacji <strong style={{ color: 'firebrick' }}>należy wybrać co najmniej jedego uczestnika.</strong></span>
            );
            return;
        }
        selectedProfilesIds.push({ id: account.profile.id })

        createConversation(auth.token, selectedProfilesIds).then((conv => {
        })).catch(err => {
            if (err.response?.status === 409) {
                pushSimpleInfoTopModal(
                    <span>konwersacja ze wskazanymi uczestnikami już istnieje.</span>
                );
            } else if (err.response?.status === 404) {
                pushSimpleInfoTopModal(
                    <span>coś poszło nie tak. Odśwież stronę i spróbuj ponownie.</span>
                );
            }
            console.error("Conversation creation error:", err);
        });

        dismissPopup();
    }

    const modalStyle = {
        backgroundColor: 'rgba(255,255,255,0.8',
        fontSize: '0.9em',
    }

    const header = (
        <span>Wpisz imiona znajomych, których chesz dodać do konwersacji:</span>
    )
    const inputDropdown = (
        <InputDropdown selectedProfiles={selectedProfiles} selectProfile={selectProfile} itemIcon={addItemIcon} />
    )
    const selectedProfilesView = (
        <div className="selected-profiles">
            <span>Wybrane osoby:</span>
            <ProfilesList profiles={selectedProfiles} onItemClick={(e) => unselectProfileById(e.currentTarget.id)} itemIcon={removeItemIcon} />
        </div>
    )
    const button = (
        <button className="our-button" type='submit' onClick={handleCreateConversation}>Stwórz konwersację</button>
    )

    return (
        <ModalPortal id={'new-conversation-modal'} onBgClick={dismissPopup} position={ModalPositions.CENTER} style={modalStyle} closeButton onClose={dismissPopup}>
            <div className='new-conversation-popup'>
                {header}
                {inputDropdown}
                {selectedProfilesView}
                {button}
            </div>
        </ModalPortal>
    )
}

export default NewConversationPopup;