import AuthScreen from './AuthScreen';
import AuthService from '../../services/AuthService';
import FormInputItem from './FormInputItem';
import { InputValidationMessages } from '../../data/string-values';
import ModalUtils from '../../utils/ModalUtils';
import React from 'react'
import { appTitle } from '../../Root';
import { useState } from 'react';

const LoginForm = (props) => {
    const {
        switchView = () => { }
    } = props;

    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!areInputsValid(email, password)) return;

        let auth = await AuthService.login({ email, password }, rememberMe);
        if (auth === null) {
            ModalUtils.pushSimpleInfoTopModal(
                <span><strong style={{ color: 'firebrick' }}>nie udało nam się odnaleźć takiego konta</strong>. Upewnij się, że wprowadzone dane są prawidłowe i spróbuj ponownie.</span>
            );
            return;
        }

        window.location.reload();
    }

    const areInputsValid = (email, password) => {
        let isValid = true;
        if (!email) {
            setEmailError(InputValidationMessages.blankValueMessage);
            isValid = false;
        }
        if (!password) {
            setPasswordError(InputValidationMessages.blankValueMessage);
            isValid = false;
        }
        return isValid;
    }

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    return (
        <AuthScreen
            header={
                <span>
                    Zaloguj się do <strong className='app-title'>{appTitle}!</strong>
                </span>}
            center={
                <form className='auth-form' onSubmit={handleSubmit}>
                    <FormInputItem name={'email'} placeholder={'E-mail...'}
                        errorMessage={emailError} clearError={() => setEmailError('')} />
                    <FormInputItem name={'password'} type={'password'} placeholder={'Hasło...'}
                        errorMessage={passwordError} clearError={() => setPasswordError('')} />

                    <label className='our-selectable-text' id='remember-me'> <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} /> Zapamiętaj mnie </label>
                    <button className="our-button" type='submit' id="submit">Zaloguj się</button>
                </form>}
            footer={
                < span >
                    Nie masz jeszcze konta? <strong onClick={switchView} className='our-text-button'>Zarejestruj się</strong>
                </span >}
        />
    )
}

export default LoginForm;