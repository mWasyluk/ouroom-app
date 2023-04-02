import { createContext, useContext } from 'react';
import { getAuthCookie, removeAuthCookie, setAuthCookie } from 'utils/cookies-utils';

import { Base64 } from 'js-base64';
import { getActiveAccount } from 'api-services/accountsApi';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let token = getAuthCookie();

    const persistToken = (token) => {
        token ? setAuthCookie(token) : removeAuthCookie();
        document.location.reload();
    }

    const login = async ({ email, password }) => {
        const toEncode = email + ':' + password;
        const encodedDetails = Base64.encode(toEncode);
        const authToken = 'Basic ' + encodedDetails;

        return await getActiveAccount(authToken).then(() => {
            persistToken(authToken)
        });
    }

    const logout = () => {
        persistToken(null);
    }

    return (
        <AuthContext.Provider value={{ token, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;