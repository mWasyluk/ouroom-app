import AuthDetails from '../../models/AuthDetails';
import AuthScreen from './AuthScreen';
import AuthService from '../../services/AuthService';
import PopupService from '../../services/popup-service/PopupService';
import React from 'react'
import { appTitle } from '../../Root';
import { useState } from 'react';

const LoginForm = (props) => {
    const {
        switchView = () => { }
    } = props;

    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const details = new AuthDetails({ email: email, password: password })
        if (!details.isValid()) {
            PopupService.invokeErrorMessage('Wprowadzone przez Ciebie dane są niezgodne z kryteriami. Wprowadź poprawne dane i spróbuj ponownie.')
            return;
        }
        let auth = await AuthService.login(details, rememberMe);
        if (auth === null) {
            PopupService.invokeErrorMessage('Niestety, nie udało nam się odnaleźć takiego konta. Sprawdź, czy wprowadzone dane są prawidłowe i spróbuj ponownie.')
            document.getElementById('password').value = '';
        } else {
            window.location.reload();
        }
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
                    <input className='our-input' type="text" name="email" id="email" placeholder="E-mail..." />
                    <input className='our-input' type="password" name="password" id="password" placeholder="Hasło..." />
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