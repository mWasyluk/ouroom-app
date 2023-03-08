import AuthScreen from './AuthScreen';
import AuthService from '../../services/AuthService';
import ModalUtils from '../../utils/ModalUtils';
import React from 'react'
import RegistrationDetails from '../../models/RegistrationDetails';
import { appTitle } from '../../Root';

const RegisterForm = (props) => {
    const {
        switchView = () => { }
    } = props;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('registration-email').value.trim();
        const password = document.getElementById('registration-password').value;
        const passwordRepeat = document.getElementById('registration-password-repeat').value;

        let registrationDetails = new RegistrationDetails({ email, password, passwordRepeat });
        if (!registrationDetails.isValid()) {
            ModalUtils.pushSimpleInfoTopModal(
                <span>wprowadzone przez Ciebie <strong style={{ color: 'firebrick' }}>dane są niezgodne z kryteriami.</strong> Popraw zaznaczone pola i spróbuj ponownie.</span>
            );
            return;
        }

        let auth = await AuthService.register({ email: registrationDetails.email, password: registrationDetails.encodedPassword })
        if (auth === null) {
            ModalUtils.pushSimpleInfoTopModal(
                <span><strong style={{ color: 'firebrick' }}>konto o takim adresie e-mail już istnieje</strong>. Wprowadź inny adres e-mail lub przejdź do okna logowania.</span>
            );
            return;
        }

        window.location.reload();
    }

    return (
        <AuthScreen
            header={<span>Zarejestruj się w <strong className='app-title'>{appTitle}!</strong></span>}
            center={
                <form className='auth-form' onSubmit={handleSubmit}>
                    <input className='our-input' type="text" name="registration-email" id="registration-email" placeholder="E-mail..." />
                    <input className='our-input' type="password" name="registration-password" id="registration-password" placeholder="Hasło..." />
                    <input className='our-input' type="password" name="registration-password-repeat" id="registration-password-repeat" placeholder="Potwierdź hasło..." />
                    <button className='our-button' type='submit' id="submit">Zarejestruj się</button>
                </form>}
            footer={<span>
                Masz już konto? <strong onClick={switchView} className='our-text-button'>Zaloguj się</strong>
            </span>}
        />
    )
}

export default RegisterForm;