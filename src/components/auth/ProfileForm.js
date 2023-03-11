import '../../styles/our-styles.css'

import AuthScreen from "./AuthScreen";
import AuthService from '../../services/AuthService';
import AvatarSelector from "./AvatarSelector";
import FormInputItem from './FormInputItem';
import { InputValidationMessages } from '../../data/string-values';
import ModalUtils from '../../utils/ModalUtils';
import ProfileService from '../../services/ProfileService';
import ValidationUtils from '../../utils/ValidationUtils';
import { appTitle } from "../../Root";
import { avatarParamName } from "../../utils/avatar-utils";
import { useState } from "react";

const ProfileForm = (props) => {
    const {
        setUser = () => { }
    } = props;
    const [avatarFile, setAvatarFile] = useState();
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [birthDateError, setBirthDateError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value.trim();
        const lastName = e.target.lastName.value.trim();
        const birthDate = e.target.birthDate.value;

        if (!areInputsValid(firstName, lastName, birthDate)) return;

        let profileResponse = await ProfileService.createProfile({ firstName, lastName, birthDate });
        if (!profileResponse) {
            ModalUtils.pushSimpleInfoTopModal(
                <span><strong style={{ color: 'firebrick' }}>nie udało nam się zapisać Twojego profilu.</strong> Odśwież stronę i spróbuj ponownie.</span>
            );
            return;
        }

        if (avatarFile) {
            const uploadResult = await uploadAvatar(avatarFile);
            if (!uploadResult) {
                ModalUtils.pushSimpleInfoTopModal(
                    <span><strong style={{ color: 'firebrick' }}>nie udało nam się zapisać Twojego avatara.</strong> Możesz zmienić domyślny obraz w dowolnym momencie w ustawieniach profilu.</span>
                );
            }

            setUser(uploadResult);
            return;
        }

        setUser(profileResponse);
    }

    const areInputsValid = (firstName, lastName, birthDate) => {
        let isValid = true;

        if (birthDate && !ValidationUtils.validateBirthDate(birthDate)) {
            setBirthDateError(InputValidationMessages.under13)
            isValid = false;
        }

        if (firstName && !ValidationUtils.validateFirsName(firstName)) {
            setFirstNameError(InputValidationMessages.invalidFirstName);
            isValid = false;
        }
        if (lastName && !ValidationUtils.validateLastName(lastName)) {
            setLastNameError(InputValidationMessages.invalidLastName);
            isValid = false;
        }

        if (!firstName) {
            setFirstNameError(InputValidationMessages.blankValue);
            isValid = false;
        }
        if (!lastName) {
            setLastNameError(InputValidationMessages.blankValue);
            isValid = false;
        }
        if (!birthDate) {
            setBirthDateError(InputValidationMessages.blankValue);
            isValid = false;
        }
        return isValid;
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
                    <FormInputItem name={'firstName'} placeholder={'Imię...'}
                        errorMessage={firstNameError} clearError={() => setFirstNameError('')} />
                    <FormInputItem name={'lastName'} placeholder={'Nazwisko...'}
                        errorMessage={lastNameError} clearError={() => setLastNameError('')} />
                    <FormInputItem addClassName={'our-short-input'} name={'birthDate'} placeholder={'da'}
                        errorMessage={birthDateError} clearError={() => setBirthDateError('')} type={'date'} />
                    <button className="our-button" type='submit' id="submit">Zapisz profil</button>
                </form>}
            footer={<span>Chcesz dokończyć później? <strong onClick={cancel} className='our-text-button'>Wyloguj się</strong></span>}
        />
    )
}

export default ProfileForm;