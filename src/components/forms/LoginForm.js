import React from 'react'
import AuthDetails from '../../domains/AuthDetails';
import '../styles/form-styles.css'
import AuthService from '../../services/AuthService';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rememberMe: false,
        }
    }

    handleSubmit = async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const details = new AuthDetails({ email: email, password: password })
        if (!details.isValid()) {
            return;
        }
        document.getElementById('password').value = ''
        const account = await AuthService.login(details, this.state.rememberMe);
        this.props.setAccount(account);
    }

    handleCheckboxChange = () => {
        this.setState({ rememberMe: !this.state.rememberMe })
    }

    render() {
        return (
            <div className="login">
                <span>Zaloguj się do<strong>OurRoom!</strong></span>
                <input type="text" name="email" id="email" placeholder="E-mail..." />
                <input type="password" name="password" id="password" placeholder="Hasło..." />
                <button type='submit' onClick={this.handleSubmit} id="submit">Zaloguj się</button>
                <label id='remember-me'> <input type="checkbox" checked={this.state.rememberMe} onChange={this.handleCheckboxChange} /> Zapamiętaj mnie </label>
            </div>
        )
    }
}