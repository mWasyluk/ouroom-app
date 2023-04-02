import Cookie from 'universal-cookie'

const cookie = new Cookie();
const authCookieName = 'auth';
const cookieExpirationTimeInSeconds = 3600 * 24 * 7; // 1 week

// TODO: path???
let options = {
    domain: window.location.hostname,
    path: '/',
    sameSite: 'strict'
}

export const setAuthCookie = (auth, rememberMe) => {
    if (rememberMe) {
        let expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + cookieExpirationTimeInSeconds * 1000);

        options.expires = expirationDate;
    } else {
        options.expires = null;
    }

    cookie.set(authCookieName, auth, options);
}

export const getAuthCookie = () => {
    return cookie.get(authCookieName, options);
}

export const removeAuthCookie = () => {
    cookie.remove(authCookieName, options);
}