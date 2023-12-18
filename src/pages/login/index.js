import { Navigate, useLocation, useNavigate } from 'react-router';
import React, { useState } from 'react'

import CenterBand from 'components/center-band/CenterBand';
import { InputValidationMessages } from 'data/validation-messages';
import InputWithError from 'components/inputs/InputWithError';
import RememberMeCheckbox from './_components/RememberMeCheckbox';
import { appTitle } from 'App';
import { locationPaths } from 'data/location-paths';
import { pushSimpleInfoTopModal } from 'utils/modal-utils';
import { useAuth } from 'contexts/auth/AuthProvider';

function LoginPage() {
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    if (auth.token) return <Navigate to={location.state?.path || locationPaths.home} replace />;

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!areInputsValid(email, password)) return;

        auth.login({ email, password }).then(() => {
            navigate(location.state?.path || locationPaths.home, { replace: true });
        }).catch(err => {
            pushSimpleInfoTopModal(
                <span><strong style={{ color: 'firebrick' }}>nie udało nam się odnaleźć takiego konta</strong>. Upewnij się, że wprowadzone dane są prawidłowe i spróbuj ponownie.</span>
            );
        });

        // return <LoadingPage></LoadingPage>
    }

    const areInputsValid = (email, password) => {
        let isValid = true;
        if (!email) {
            setEmailError(InputValidationMessages.blankValue);
            isValid = false;
        }
        if (!password) {
            setPasswordError(InputValidationMessages.blankValue);
            isValid = false;
        }
        return isValid;
    }

    return (
        <CenterBand
            header={
                <span>
                    Zaloguj się do <strong className='app-title'>{appTitle}!</strong>
                </span>}
            center={
                <form className='auth-form' onSubmit={handleLogin}>
                    <InputWithError name={'email'} placeholder={'E-mail...'}
                        errorMessage={emailError} clearError={() => setEmailError('')} />
                    <InputWithError name={'password'} type={'password'} placeholder={'Hasło...'}
                        errorMessage={passwordError} clearError={() => setPasswordError('')} />

                    <RememberMeCheckbox checked={rememberMe} onChange={handleRememberMe} />
                    <button className="our-button" type='submit' id="submit">Zaloguj się</button>
                </form>}
            footer={
                < span >
                    Nie masz jeszcze konta? <strong onClick={() => navigate(locationPaths.register)} className='our-text-button'>Zarejestruj się</strong>
                </span >}
        />
    )
}

export default LoginPage;
