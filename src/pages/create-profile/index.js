import 'styles/our-styles.css';

import { validateBirthDate, validateFirsName, validateLastName } from 'utils/validation-utils';

import AvatarSelector from 'components/avatar-selector/AvatarSelector';
import CenterBand from 'components/center-band/CenterBand';
import { InputValidationMessages } from 'data/validation-messages';
import InputWithError from 'components/inputs/InputWithError';
import { Navigate } from 'react-router';
import { appTitle } from 'App';
import { createProfile } from 'api-services/profilesApi';
import { locationPaths } from 'data/location-paths';
import { pushSimpleInfoTopModal } from 'utils/modal-utils';
import { useAccount } from 'contexts/account/AccountProvider';
import { useAuth } from 'contexts/auth/AuthProvider';
import { useState } from 'react';

const CreateProfilePage = () => {
    const [avatarFile, setAvatarFile] = useState();
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [birthDateError, setBirthDateError] = useState('');

    const auth = useAuth();
    const account = useAccount();

    if (account?.id && account?.profile) return <Navigate to={locationPaths.home} replace />

    const handleSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value.trim();
        const lastName = e.target.lastName.value.trim();
        const birthDate = e.target.birthDate.value;

        if (!areInputsValid(firstName, lastName, birthDate)) return;

        createProfile(auth.token, { firstName, lastName, birthDate, avatarFile }).then(profile => {
            console.log("Profile has been created.", profile);
            document.location.reload();
        }).catch(err => {
            console.log("Profile creation error:", err.message);
            pushSimpleInfoTopModal(
                <span><strong style={{ color: 'firebrick' }}>nie udało nam się zapisać Twojego profilu.</strong> Odśwież stronę i spróbuj ponownie.</span>
            );
        })
    }

    const areInputsValid = (firstName, lastName, birthDate) => {
        let isValid = true;

        if (birthDate && !validateBirthDate(birthDate)) {
            setBirthDateError(InputValidationMessages.under13)
            isValid = false;
        }

        if (firstName && !validateFirsName(firstName)) {
            setFirstNameError(InputValidationMessages.invalidFirstName);
            isValid = false;
        }
        if (lastName && !validateLastName(lastName)) {
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

    return (
        <CenterBand
            header={<span>Stwórz swój profil, aby w pełni korzystać z <strong className='app-title'>{appTitle}!</strong></span>}
            center={
                <form className='auth-form' onSubmit={handleSubmit}>
                    <AvatarSelector selectFile={setAvatarFile}></AvatarSelector>
                    <InputWithError name={'firstName'} placeholder={'Imię...'}
                        errorMessage={firstNameError} clearError={() => setFirstNameError('')} />
                    <InputWithError name={'lastName'} placeholder={'Nazwisko...'}
                        errorMessage={lastNameError} clearError={() => setLastNameError('')} />
                    <InputWithError addClassName={'our-short-input'} name={'birthDate'}
                        errorMessage={birthDateError} clearError={() => setBirthDateError('')} type={'date'} />
                    <button className="our-button" type='submit' id="submit">Zapisz profil</button>
                </form>}
            footer={<span>Chcesz dokończyć później? <strong onClick={() => auth.logout()} className='our-text-button'>Wyloguj się</strong></span>}
        />
    )
}

export default CreateProfilePage;
