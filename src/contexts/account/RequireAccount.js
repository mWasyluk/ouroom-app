import { Navigate, useLocation } from 'react-router';

import { locationPaths } from 'data/location-paths';
import { useAccount } from 'contexts/account/AccountProvider.js';

function RequireAccount({ children }) {
    const account = useAccount();
    const location = useLocation();

    if (account?.id && !account?.profile) {
        return <Navigate to={locationPaths.createProfile} replace state={{ path: location.pathname }} />
    } else {
        return children;
    }
}

export default RequireAccount;
