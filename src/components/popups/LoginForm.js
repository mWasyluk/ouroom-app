import AuthDetails from '../../models/AuthDetails';
import AuthService from '../../services/AuthService';
import FormPopup from './FormPopup';
import React from 'react'
import { appTitle } from '../../Root';
import { useState } from 'react';

const LoginForm = (props) => {
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const details = new AuthDetails({ email: email, password: password })
        if (!details.isValid()) {
            return;
        }
        let auth = await AuthService.login(details, rememberMe);
        if (auth === null) {
            document.getElementById('password').value = '';
        } else {
            window.location.reload();
        }
    }

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    return (
        <FormPopup outsideBg={false} insideBg={{ opacity: 0.5 }} onSubmit={handleSubmit}>
            <span>Zaloguj się do<strong>{appTitle}!</strong></span>

            <div className='popup-group'>
                <input type="text" name="email" id="email" placeholder="E-mail..." />
                <input type="password" name="password" id="password" placeholder="Hasło..." />
                <label id='remember-me'> <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} /> Zapamiętaj mnie </label>
                <button type='submit' id="submit">Zaloguj się</button>
            </div>

            <p className='footer-text'>
                Nie masz jeszcze konta?
                <strong onClick={props.switch} className='text-button'>Zarejestruj się</strong>
            </p>
        </FormPopup>
    )
}

export default LoginForm;