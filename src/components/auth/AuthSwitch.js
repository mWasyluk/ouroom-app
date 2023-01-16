import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useState } from 'react'

const AuthPopup = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchView = () => {
        setIsLogin(!isLogin);
    }

    return (
        <>
            {isLogin ?
                <LoginForm switchView={switchView} /> :
                <RegisterForm switchView={switchView} />
            }
        </>
    )
}

export default AuthPopup;