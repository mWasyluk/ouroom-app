import ConversationService from "../../services/ConversationService";
import FormPopup from "../popups/FormPopup"
import InputDropdown from "../popups/InputDropdown";
import ProfilesList from "./ProfilesList";
import { useState } from "react";

const NewConversationPopup = (props) => {
    const { dismissPopup, userId } = props;
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
        if (selectedProfilesIds.length > 0) {
            selectedProfilesIds.push({ id: userId })
            const response = await ConversationService.createConversation(selectedProfilesIds);
            if (response !== null) {
                window.location.reload();
            }
        } else {
            console.error("Invalid selected profiles IDs. Conversation cannot be created.")
        }
    }

    const header = <span>Wpisz imiona znajomych, aby dodać ich do konwersacji:</span>;
    const inputDropdown = <InputDropdown selectProfile={selectProfile} />
    const selectedProfilesView = <div className="selected-profiles"><ProfilesList profiles={selectedProfiles} onItemClick={(e) => unselectProfileById(e.currentTarget.id)} /></div>
    const button = <button type='submit'>Stwórz konwersację</button>

    return (
        <FormPopup
            outsideBg={{ opacity: .5 }}
            insideBg={{ opacity: .8 }}
            onClickBg={dismissPopup}
            onSubmit={handleCreateConversation}>
            {header}
            {inputDropdown}
            {selectedProfilesView}
            {button}
        </FormPopup>
    )
}

export default NewConversationPopup;