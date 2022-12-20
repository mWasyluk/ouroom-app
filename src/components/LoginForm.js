import React from 'react'
import '../Root.css'
import { getUserAccountWithProfile } from '../utils/fetch';

const cookieExpirationTime = 7 * 24 * 3600 * 1000; // 1 week
export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setAccount: props.setAccount,
            setAuthToken: props.setAuthToken,
        }
    }

    getAccount = async (token) => {
        let account = await getUserAccountWithProfile(token);
        if (account.profile) {
            this.state.setAccount(account);
            this.state.setAuthToken(token);
            let expirationDate = new Date(new Date().getTime() + cookieExpirationTime)
            document.cookie = 'user=' + JSON.stringify(account) + ';expires=' + expirationDate + ';domain=localhost;SameSite=Strict'
            document.cookie = 'token=' + token + ';expires=' + expirationDate + ';domain=localhost;SameSite=Strict'
        }
    }

    handleSubmit = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let base64Token = 'Basic ' + window.btoa(email + ':' + password);
        this.getAccount(base64Token)

        document.getElementById('password').value = ''
    }

    render() {
        return (
            <div className="popup">
                <span>Zaloguj się do<strong>OurRoom!</strong></span>
                <input type="text" name="email" id="email" placeholder="E-mail..." />
                <input type="password" name="password" id="password" placeholder="Hasło..." />
                <button type='submit' onClick={this.handleSubmit} id="submit">Zaloguj się</button>
            </div>
        )
    }
}