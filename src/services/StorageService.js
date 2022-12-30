import Cookie from 'universal-cookie'
import { hostname } from '../utils/server-info';

const cookie = new Cookie();
const authTokenCookieName = 'auth-token';
const cookieExpirationTimeInSeconds = 3600 * 24 * 7; // 1 week

const StorageService = {
    setAuthToken(token, rememberMe) {
        let options = {
            domain: hostname,
            sameSite: 'strict'
        }

        if (rememberMe) {
            let expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + cookieExpirationTimeInSeconds * 1000);

            options.expires = expirationDate;
        }

        cookie.set(authTokenCookieName, token, options);
        console.log('auth-token cookie set to', token, 'with options', options);
    },

    getAuthToken() {
        return cookie.get(authTokenCookieName);
    },

    removeAuthToken() {
        cookie.remove(authTokenCookieName);
    }
}

export default StorageService;