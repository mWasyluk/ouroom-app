import { createContext, useContext, useState } from 'react';

import Account from 'models/Account';
import { getActiveAccount } from 'api-services/accountsApi';
import { useAuth } from 'contexts/auth/AuthProvider';

const AccountContext = createContext();

const AccountProvider = ({ children }) => {
    const auth = useAuth();
    const [account, setAccount] = useState(null);

    const fetch = async () => {
        return await getActiveAccount(auth.token).then(account => {
            setAccount(new Account(account));
        });
    }

    return (
        <AccountContext.Provider value={{ id: account?.id, profile: account?.profile, fetch }} >
            {children}
        </AccountContext.Provider>
    )
}

export const useAccount = () => {
    return useContext(AccountContext);
}

export default AccountProvider;