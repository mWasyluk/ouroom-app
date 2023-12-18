import 'styles/index.css';
import 'styles/our-styles.css';

import { Outlet, Route, Routes } from 'react-router-dom';

import AppHeader from 'components/app-header/AppHeader';
import ConversationPage from 'pages/conversations';
import ConversationsList from 'features/conversations-list/ConversationsList';
import CreateProfilePage from 'pages/create-profile';
import HomePage from 'pages/home';
import LoadingPage from 'pages/loading';
import LoginPage from 'pages/login';
import Logout from 'pages/logout';
import MenuPage from 'pages/menu';
import NotFoundPage from 'pages/not-found';
import RegisterPage from 'pages/register';
import RequireAccount from 'contexts/account/RequireAccount';
import RequireAuth from 'contexts/auth/RequireAuth';
import WebsocketProvider from 'contexts/websocket/websocket';
import WelcomePage from 'pages/welcome';
import { useAccount } from 'contexts/account/AccountProvider';
import { useAuth } from 'contexts/auth/AuthProvider';
import { useState } from 'react';

export const appTitle = 'OuRoom';

function App() {
    const { token } = useAuth();
    const [isServerError, setIsServerError] = useState(false);
    const { id, fetch } = useAccount();

    if (isServerError) {
        return <>Connection error...</>
    }

    if (token && !id) {
        fetch().catch(error => {
            console.error(error.message)
            setIsServerError(true);
        })

        return <LoadingPage />;
    }

    return (
        <div className='app'>
            <Routes>
                <Route path='/' element={
                    <RequireAuth>
                        <RequireAccount>
                            <WebsocketProvider>
                                <AppHeader />
                                <Outlet />
                            </WebsocketProvider>
                        </RequireAccount>
                    </RequireAuth>
                }>
                    <Route index element={
                        <div className='app-content'>
                            <ConversationsList />
                            <HomePage />
                        </div>
                    } />
                    <Route path='conversations/:id' element={
                        <div className='app-content'>
                            <ConversationsList />
                            <ConversationPage />
                        </div>
                    } />
                    <Route path='menu' element={<Outlet />}>
                        <Route index element={<MenuPage />} />
                        <Route path='settings' element={<>Settings</>} />
                        <Route path='profile' element={<>Profile</>} />
                        <Route path='informations' element={<>Informations</>} />
                    </Route>
                </Route>
                <Route path='create-profile' element={
                    <RequireAuth>
                        <CreateProfilePage />
                    </RequireAuth>
                } />
                <Route path='logout' element={
                    <RequireAuth>
                        <Logout />
                    </RequireAuth>
                } />
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='*' element={<NotFoundPage />} />
                <Route path='welcome' element={<WelcomePage />} />
            </Routes>
        </div>
    )
}

export default App;
