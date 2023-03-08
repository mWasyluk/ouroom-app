import AuthDetails from '../../models/AuthDetails';
import AuthScreen from './AuthScreen';
import AuthService from '../../services/AuthService';
import ModalUtils from '../../utils/ModalUtils';
import React from 'react'
import { appTitle } from '../../Root';
import { useState } from 'react';

const LoginForm = (props) => {
    const {
        switchView = () => { }
    } = props;

    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const details = new AuthDetails({ email: email, password: password })
        if (!details.isValid()) {
            ModalUtils.pushSimpleInfoTopModal(
                <span>wprowadzone przez Ciebie <strong style={{ color: 'firebrick' }}>dane są niezgodne z kryteriami</strong>. Popraw zaznaczone pola i spróbuj ponownie.</span>
            );
            return;
        }
        let auth = await AuthService.login(details, rememberMe);
        if (auth === null) {
            ModalUtils.pushSimpleInfoTopModal(
                <span><strong style={{ color: 'firebrick' }}>nie udało nam się odnaleźć takiego konta</strong>. Upewnij się, że wprowadzone dane są prawidłowe i spróbuj ponownie.</span>
            );
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