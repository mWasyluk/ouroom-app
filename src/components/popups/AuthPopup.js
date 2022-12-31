import { useState } from 'react'
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const AuthPopup = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchView = () => {
        setIsLogin(!isLogin);
    }

    return (
        <>
            {isLogin ?
                <LoginForm switch={switchView} /> :
                <RegisterForm switch={switchView} />
            }
        </>
    )
}

export default AuthPopup;