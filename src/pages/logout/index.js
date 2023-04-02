import React, { useEffect } from 'react'

import LoadingPage from 'pages/loading';
import { useAuth } from 'contexts/auth/AuthProvider';

function Logout() {
    const auth = useAuth();

    useEffect(() => {
        auth.logout();
    }, [auth]);

    return <LoadingPage />
}

export default Logout;