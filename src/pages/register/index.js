import React, { useState } from 'react'
import { validateEmail, validatePassword } from 'utils/validation-utils';

import CenterBand from 'components/center-band/CenterBand';
import { InputValidationMessages } from 'data/validation-messages';
import InputWithError from 'components/inputs/InputWithError';
import { appTitle } from 'App';
import { locationPaths } from 'data/location-paths';
import { pushSimpleInfoTopModal } from 'utils/modal-utils';
import { registerAccount } from 'api-services/accountsApi';
import { useNavigate } from 'react-router';

const RegisterPage = () => {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordRepetitionError, setPasswordRepetitionError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const passwordRepetition = e.target.passwordRepetition.value;

        if (!areInputsValid(email, password, passwordRepetition)) return;

        let account = await registerAccount({ email, password }).catch(err => console.error(err.message));
        if (!account) {
            pushSimpleInfoTopModal(
                <span><strong style={{ color: 'firebrick' }}>konto o takim adresie e-mail już istnieje</strong>. Wprowadź inny adres e-mail lub przejdź do okna logowania.</span>
            );
            return;
        }

        navigate(locationPaths.login);
    }

    const areInputsValid = (email, password, passwordRepetition) => {
        let isValid = true;

        if (password !== passwordRepetition) {
            setPasswordRepetitionError(InputValidationMessages.varyPasswords);
            isValid = false;
        }

        if (!validateEmail(email)) {
            setEmailError(InputValidationMessages.invalidEmail);
            isValid = false;
        }
        if (!validatePassword(password)) {
            setPasswordError(InputValidationMessages.invalidPassword);
            isValid = false;
        }

        if (!email) {
            setEmailError(InputValidationMessages.blankValue);
            isValid = false;
        }
        if (!password) {
            setPasswordError(InputValidationMessages.blankValue);
            isValid = false;
        }
        if (!passwordRepetition) {
            setPasswordRepetitionError(InputValidationMessages.blankValue);
            isValid = false;
        }
        return isValid;
    }

    return (
        <CenterBand
            header={<span>Zarejestruj się w <strong className='app-title'>{appTitle}!</strong></span>}
            center={
                <form className='auth-form' onSubmit={handleSubmit}>
                    <InputWithError name={'email'} placeholder={'E-mail...'}
                        errorMessage={emailError} clearError={() => setEmailError('')} />
                    <InputWithError name={'password'} placeholder={'Hasło...'}
                        errorMessage={passwordError} clearError={() => { setPasswordError(''); setPasswordRepetitionError('') }}
                        type={'password'} />
                    <InputWithError name={'passwordRepetition'} placeholder={'Potwierdź hasło...'}
                        errorMessage={passwordRepetitionError} clearError={() => { setPasswordRepetitionError('') }}
                        type={'password'} />
                    <button className='our-button' type='submit'>Zarejestruj się</button>
                </form>}
            footer={<span>
                Masz już konto? <strong onClick={() => navigate(locationPaths.login)} className='our-text-button'>Zaloguj się</strong>
            </span>}
        />
    )
}

export default RegisterPage;
