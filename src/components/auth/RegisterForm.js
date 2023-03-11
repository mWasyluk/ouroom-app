import React, { useState } from 'react'

import AuthScreen from './AuthScreen';
import AuthService from '../../services/AuthService';
import FormInputItem from './FormInputItem';
import { InputValidationMessages } from '../../data/string-values';
import ModalUtils from '../../utils/ModalUtils';
import ValidationUtils from '../../utils/ValidationUtils';
import { appTitle } from '../../Root';

const RegisterForm = (props) => {
    const {
        switchView = () => { }
    } = props;

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordRepetitionError, setPasswordRepetitionError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;
        const passwordRepetition = e.target.passwordRepetition.value;

        if (!areInputsValid(email, password, passwordRepetition)) return;

        let auth = await AuthService.register({ email, password })
        if (auth === null) {
            ModalUtils.pushSimpleInfoTopModal(
                <span><strong style={{ color: 'firebrick' }}>konto o takim adresie e-mail już istnieje</strong>. Wprowadź inny adres e-mail lub przejdź do okna logowania.</span>
            );
            return;
        }

        window.location.reload();
    }

    const areInputsValid = (email, password, passwordRepetition) => {
        let isValid = true;

        if (password !== passwordRepetition) {
            setPasswordRepetitionError(InputValidationMessages.varyPasswords);
            isValid = false;
        }

        if (!ValidationUtils.validateEmail(email)) {
            setEmailError(InputValidationMessages.invalidEmail);
            isValid = false;
        }
        if (!ValidationUtils.validatePassword(password)) {
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
        <AuthScreen
            header={<span>Zarejestruj się w <strong className='app-title'>{appTitle}!</strong></span>}
            center={
                <form className='auth-form' onSubmit={handleSubmit}>
                    <FormInputItem name={'email'} placeholder={'E-mail...'}
                        errorMessage={emailError} clearError={() => setEmailError('')} />
                    <FormInputItem name={'password'} placeholder={'Hasło...'}
                        errorMessage={passwordError} clearError={() => { setPasswordError(''); setPasswordRepetitionError('') }}
                        type={'password'} />
                    <FormInputItem name={'passwordRepetition'} placeholder={'Potwierdź hasło...'}
                        errorMessage={passwordRepetitionError} clearError={() => { setPasswordRepetitionError('') }}
                        type={'password'} />
                    <button className='our-button' type='submit'>Zarejestruj się</button>
                </form>}
            footer={<span>
                Masz już konto? <strong onClick={switchView} className='our-text-button'>Zaloguj się</strong>
            </span>}
        />
    )
}

export default RegisterForm;