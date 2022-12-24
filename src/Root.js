import './Root.css';
import useWindowDimensions from './utils/window-resizer';
import Header from './components/Header';
import App from './components/App';
import LoginForm from './components/forms/LoginForm';
import Menu from './components/Menu';
import AuthService from './services/AuthService';
import { useEffect, useState } from 'react';
import Account from './domains/Account';

function Root() {
  const { height, width } = useWindowDimensions();
  const margin = 10;

  let [user, setUser] = useState(null)
  let [userStatus, setUserStatus] = useState('offline')
  let [authToken, setAuthToken] = useState();
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
          <div className="popup">
            <LoginForm setAccount={setUser} setAuthToken={setAuthToken} />
          </div>
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
        setView(<>dodawanie profilu</>)
      }

      else if (new Account(user).profile.isComplete()) {
        console.log('Account Profile is complete. Pushing App view...');
        setView(
          <>
            <Header user={user} userStatus={userStatus} isMenuInvoked={isMenuInvoked} setMenuInvoked={setMenuInvoked}></Header>
            <Menu styles={{ display: isMenuInvoked ? 'flex' : 'none' }} menuSelectionCallback={menuSelectionCallback}></Menu>
            <App styles={{ display: !isMenuInvoked ? 'flex' : 'none' }} user={user} setUserStatus={setUserStatus}></App>
          </>
        );
      }
    }

    console.log("Setting up the view...")
    checkUserAndSetView()
  }, [user, userStatus, authToken, isMenuInvoked]);

  return (
    <div className="root" style={{
      margin: margin + "px",
      width: width - 2 * margin,
      height: height - 2 * margin,
      minWidth: "500px"
    }}>
      {view}
    </div >
  );
}

export default Root;
