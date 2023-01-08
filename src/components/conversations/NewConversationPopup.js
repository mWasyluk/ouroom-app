import './new-conversation-style.css'

import ConversationService from "../../services/ConversationService";
import InputDropdown from "../profiles/InputDropdown";
import PopupService from "../../services/popup-service/PopupService";
import ProfilesList from "../profiles/ProfilesList";
import { useState } from "react";

const NewConversationPopup = (props) => {
    const {
        dismissPopup = () => { },
        userId = ''
    } = props;

    const [selectedProfiles, setSelectedProfiles] = useState([])

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
            PopupService.invokeErrorMessage('Przed utworzeniem konwersacji należy wybrać co najmniej jedego uczestnika.');
            return;
        }

        selectedProfilesIds.push({ id: userId })
        const response = await ConversationService.createConversation(selectedProfilesIds);
        if (response === null) {
            PopupService.invokeErrorMessage('Konwersacja ze wskazanymi uczestnikami już istnieje.')
            return;
        }

        window.location.reload();
    }

    const header = (
        <span>Wpisz imiona znajomych, których chesz dodać do konwersacji:</span>
    )
    const inputDropdown = (
        <InputDropdown selectedProfiles={selectedProfiles} selectProfile={selectProfile} />
    )
    const selectedProfilesView = (
        <div className="selected-profiles">
            <span>Wybrane osoby:</span>
            <ProfilesList profiles={selectedProfiles} onItemClick={(e) => unselectProfileById(e.currentTarget.id)} />
        </div>
    )
    const button = (
        <button className="our-button" type='submit' onClick={handleCreateConversation}>Stwórz konwersację</button>
    )

    return (
        PopupService.centerPopup(
            <div className='new-conversation-popup'>
                {header}
                {inputDropdown}
                {selectedProfilesView}
                {button}
            </div>,
            dismissPopup)
    )
}

export default NewConversationPopup;