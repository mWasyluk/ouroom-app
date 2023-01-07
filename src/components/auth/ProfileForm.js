import '../../styles/our-styles.css'

import AuthScreen from "./AuthScreen";
import AuthService from '../../services/AuthService';
import AvatarSelector from "./AvatarSelector";
import ProfileDetails from "../../models/ProfileDetails";
import ProfileService from '../../services/ProfileService';
import { appTitle } from "../../Root";
import { avatarParamName } from "../../utils/avatar-utils";
import { useState } from "react";

const ProfileForm = (props) => {
    const {
        setUser = () => { }
    } = props;
    const [avatarFile, setAvatarFile] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('first-name').value.trim();
        const lastName = document.getElementById('last-name').value.trim();
        const birthDate = document.getElementById('birth-date').value;

        let profileDetails = new ProfileDetails({ firstName, lastName, birthDate });
        if (profileDetails.isValid()) {
            let profileResponse = await ProfileService.createProfile(profileDetails);
            if (!profileResponse) {
                return;
            }

            if (avatarFile) {
                const uploadResult = await uploadAvatar(avatarFile);
                if (uploadResult) {
                    setUser(uploadResult);
                    return;
                }
            }

            setUser(profileResponse);
        }
    }

    const uploadAvatar = async (file) => {
        const formData = new FormData();
        formData.append(avatarParamName, file);

        return await ProfileService.updateProfileAvatar(formData)
    }

    const cancel = () => {
        AuthService.logout();
        window.location.reload();
    }

    return (
        <AuthScreen
            header={<span>Stwórz swój profil, aby w pełni korzystać z <strong className='app-title'>{appTitle}!</strong></span>}
            center={
                <form className='auth-form' onSubmit={handleSubmit}>
                    <AvatarSelector selectFile={setAvatarFile}></AvatarSelector>
                    <input className='our-input' type="text" name="first-name" id="first-name" placeholder="Imię..." />
                    <input className='our-input' type="text" name="last-name" id="last-name" placeholder="Nazwisko..." />
                    <input className='our-input our-short-input' type="date" name="birth-date" id="birth-date" placeholder='Data urodzenia' />
                    <button className="our-button" type='submit' id="submit">Zapisz profil</button>
                </form>}
            footer={<span>Chcesz dokończyć później? <strong onClick={cancel} className='our-text-button'>Wyloguj się</strong></span>}
        />
    )
}

export default ProfileForm;