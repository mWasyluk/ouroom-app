import './styles/root-style.css';

import { useEffect, useState } from 'react';

import Account from './models/Account';
import App from './components/App';
import AuthService from './services/AuthService';
import AuthSwitch from './components/auth/AuthSwitch'
import Header from './components/Header';
import Menu from './components/menu/Menu';
import ProfileForm from './components/auth/ProfileForm';
import useWindowDimensions from './utils/window-resizer';

export const appTitle = 'OuRoom'
document.title = appTitle;

function Root() {
  const { height, width } = useWindowDimensions();

  let [user, setUser] = useState(null)
  let [userStatus, setUserStatus] = useState('offline')
  let [isMenuInvoked, setMenuInvoked] = useState(false);
  let [view, setView] = useState(<></>);

  // handles each of the Menu options
  let menuSelectionCallback = (optionId) => {
    switch (optionId) {
      case 'menu-item-logout':
        AuthService.logout();
        window.location.reload();
        break;
      case 'menu-item-settings':
        break;
      case 'menu-item-profile':
        break;
      case 'menu-item-information':
        break;
      default:
        console.error(optionId, 'cannot be handled as an option')
    }
  }

  useEffect(() => {
    async function checkUserAndSetView() {
      const isAuth = AuthService.isAuthenticated();

      if (!isAuth) {
        console.warn('Unauthenticated.', user, '. Pushing Login Form...');
        setView(
          <AuthSwitch></AuthSwitch>
        );
      }

      else if (!user || !user.profile) {
        const auth = await AuthService.requestAccount();
        if (auth && auth.profile)
          setUser(auth);
      }

      else if (!new Account(user).profile.isComplete()) {
        console.warn('User profile is not complete', user, 'but isAuthenticated', isAuth, '. Pushing Profile Form...');
        setView(<ProfileForm setUser={setUser}></ProfileForm>)
      }

      else if (new Account(user).profile.isComplete()) {
        setView(
          <>
            <Header user={user} userStatus={userStatus} isMenuInvoked={isMenuInvoked} setMenuInvoked={setMenuInvoked}></Header>
            <Menu styles={{ display: isMenuInvoked ? 'flex' : 'none' }} menuSelectionCallback={menuSelectionCallback}></Menu>
            <App styles={{ display: !isMenuInvoked ? 'flex' : 'none' }} user={user} setUserStatus={setUserStatus}></App>
          </>
        );
      }
    }

    checkUserAndSetView()
  }, [user, userStatus, isMenuInvoked]);

  return (
    <div className="root" style={{
      width: width,
      height: height,
      minWidth: "200px"
    }}>
      <div className='sliding-background'></div>
      {view}
    </div >
  );
}

export default Root;
