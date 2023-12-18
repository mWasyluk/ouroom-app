import { Navigate, useLocation } from 'react-router';

import { locationPaths } from 'data/location-paths';
import { useAuth } from 'contexts/auth/AuthProvider.js';

function RequireAuth({ children }) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.token) {
        const pathname = location.pathname !== locationPaths.logout ? location.pathname : locationPaths.home;
        return <Navigate to={locationPaths.login} replace state={{ path: pathname }} />
    } else {
        return children;
    }
}

export default RequireAuth;
