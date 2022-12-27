import './styles/Root.css';
import useWindowDimensions from './utils/window-resizer';
import Header from './components/Header';
import App from './components/App';
import Menu from './components/Menu';
import AuthService from './services/AuthService';
import { useEffect, useState } from 'react';
import Account from './domains/Account';
import AuthPopup from './components/forms/AuthPopup'
import ProfileForm from './components/forms/ProfileForm';

export const appTitle = 'OuRoom'

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
          <AuthPopup></AuthPopup>
        );
      }

      else if (!user || !user.profile) {
        console.warn('User has no profile', user, 'but isAuthenticated', isAuth, '. Requesting Account...');
        const auth = await AuthService.requestAccount();
        if (auth.profile)
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
