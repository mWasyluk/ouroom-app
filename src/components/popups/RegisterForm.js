import AuthService from '../../services/AuthService';
import FormPopup from './FormPopup';
import React from 'react'
import RegistrationDetails from '../../models/RegistrationDetails';
import { appTitle } from '../../Root';

const RegisterForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <FormPopup outsideBg={false} insideBg={{ opacity: 0.5 }} onSubmit={handleSubmit}>
            <span>Zarejestruj się w<strong>{appTitle}!</strong></span>
            <div className="popup-group">
                <input type="text" name="registration-email" id="registration-email" placeholder="E-mail..." />
                <input type="password" name="registration-password" id="registration-password" placeholder="Hasło..." />
                <input type="password" name="registration-password-repeat" id="registration-password-repeat" placeholder="Potwierdź hasło..." />
                <button type='submit' id="submit">Zarejestruj się</button>
            </div>
            <p className='footer-text'>
                Masz już konto?
                <strong onClick={props.switch} className='text-button'>Zaloguj się</strong>
            </p>
        </FormPopup >
    )
}

export default RegisterForm;