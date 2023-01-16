import Account from "../models/Account";
import AuthDetails from "../models/AuthDetails";
import StorageService from "./StorageService";
import axios from 'axios'

const AuthService = {
    async login({ email, password } = {}, rememberMe = false) {
        const details = new AuthDetails({ email, password })
        if (details.isValid()) {
            const toEncode = details.email + ':' + details.password;
            const encodedDetails = window.btoa(toEncode);
            const authToken = 'Basic ' + encodedDetails;

            let response = await requestAuthentiaction(authToken);
            if (response.status === 200) {
                StorageService.setAuthToken(authToken, rememberMe);
                return new Account(response.data.body);
            }
        }
        return null;
    },
    async requestAccount() {
        if (this.isAuthenticated()) {
            const response = await requestAuthentiaction(this.getAuthToken());
            if (response.status === 200) {
                return new Account(response.data.body);
            }
        }
        return null;
    },
    logout() {
        StorageService.removeAuthToken();
    },
    async register({ email, password }) {
        const response = await requestRegistration({ email, password })
        if (response.status === 201) {
            return new Account(response.data.body);
        }
        return null;
    },
    isAuthenticated() {
        return StorageService.getAuthToken() ? true : false;
    },
    getAuthToken() {
        return StorageService.getAuthToken();
    }
}

async function requestAuthentiaction(token) {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    }
    return await axios.get(
        'api/accounts', config).catch(err => {
            return { status: 400 }
        });
}

async function requestRegistration({ email, password }) {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }
    return await axios.post(
        'api/accounts/register', { email, password }, config).catch(err => {
            return { status: 400 }
        });
}

export default AuthService;