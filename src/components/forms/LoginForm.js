import React from 'react'
import AuthDetails from '../../domains/AuthDetails';
import '../../styles/form-styles.css'
import AuthService from '../../services/AuthService';
import { useState } from 'react';
import { appTitle } from '../../Root';

const LoginForm = (props) => {
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async () => {
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
        <div className="popup-form">
            <span>Zaloguj się do<strong>{appTitle}!</strong></span>
            <input type="text" name="email" id="email" placeholder="E-mail..." />
            <input type="password" name="password" id="password" placeholder="Hasło..." />
            <label id='remember-me'> <input type="checkbox" checked={rememberMe} onChange={handleRememberMe} /> Zapamiętaj mnie </label>
            <button type='submit' onClick={handleSubmit} id="submit">Zaloguj się</button>
            <p className='footer-text'>
                Nie masz jeszcze konta?
                <strong onClick={props.switch} className='text-button'>Zarejestruj się</strong>
            </p>
        </div>
    )
}

export default LoginForm;