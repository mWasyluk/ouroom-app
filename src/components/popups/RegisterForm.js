import '../../styles/form-styles.css'

import AuthService from '../../services/AuthService';
import React from 'react'
import RegistrationDetails from '../../models/RegistrationDetails';
import { appTitle } from '../../Root';

const RegisterForm = (props) => {
    const handleSubmit = async () => {
        const email = document.getElementById('registration-email').value.trim();
        const password = document.getElementById('registration-password').value;
        const passwordRepeat = document.getElementById('registration-password-repeat').value;

        let registrationDetails = new RegistrationDetails({ email, password, passwordRepeat });
        if (registrationDetails.isValid()) {
            console.log(registrationDetails.encodedPassword)
            let auth = await AuthService.register({ email: registrationDetails.email, password: registrationDetails.encodedPassword })
            if (auth !== null) {
                console.log("Account has been registered.", auth)
                props.switch();
            } else {
                console.log("Account could not be registered.")
            }
        }
    }

    return (
        <div className="popup-form white05">
            <span>Zarejestruj się w<strong>{appTitle}!</strong></span>
            <input type="text" name="registration-email" id="registration-email" placeholder="E-mail..." />
            <input type="password" name="registration-password" id="registration-password" placeholder="Hasło..." />
            <input type="password" name="registration-password-repeat" id="registration-password-repeat" placeholder="Potwierdź hasło..." />
            <button type='submit' onClick={handleSubmit} id="submit">Zarejestruj się</button>
            <p className='footer-text'>
                Masz już konto?
                <strong onClick={props.switch} className='text-button'>Zaloguj się</strong>
            </p>
        </div >
    )
}

export default RegisterForm;