import './new-conversation-style.css'

import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'

import ConversationService from "../../services/ConversationService";
import InputDropdown from "../profiles/InputDropdown";
import ModalPortal from '../modals/ModalPortal';
import { ModalPositions } from '../modals/ModalPortal';
import ModalUtils from '../../utils/ModalUtils';
import ProfilesList from "../profiles/ProfilesList";
import { useState } from "react";

const addItemIcon = { iconElement: <FaPlusCircle />, color: '#009726' };
const removeItemIcon = { iconElement: <FaMinusCircle />, color: '#970000' }

const NewConversationPopup = (props) => {
    const {
        dismissPopup = () => { },
        userId = ''
    } = props;

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
            ModalUtils.pushSimpleInfoTopModal(
                <span>przed utworzeniem konwersacji <strong style={{ color: 'firebrick' }}>należy wybrać co najmniej jedego uczestnika.</strong></span>
            );
            return;
        }

        selectedProfilesIds.push({ id: userId })
        const response = await ConversationService.createConversation(selectedProfilesIds);
        if (response === null) {
            ModalUtils.pushSimpleInfoTopModal(
                <span>konwersacja ze wskazanymi uczestnikami już istnieje.</span>
            );
            return;
        }

        dismissPopup();
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
        <ModalPortal id={'new-conversation-modal'} onBgClick={dismissPopup} position={ModalPositions.CENTER}>
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