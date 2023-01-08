import './styles/root-style.css';
import './styles/our-styles.css';

import { useEffect, useState } from 'react';

import Account from './models/Account';
import App from './components/App';
import AuthService from './services/AuthService';
import AuthSwitch from './components/auth/AuthSwitch'
import Header from './components/Header';
import Menu from './components/menu/Menu';
import ProfileForm from './components/auth/ProfileForm';
import { useWindowDimensions } from './utils/window-size-utils';
import { CgMenuGridR } from 'react-icons/cg';

export const appTitle = 'OuRoom'
document.title = appTitle;

const defaultHeaderIcon = <CgMenuGridR />;

function Root() {
  const { height, width } = useWindowDimensions();

  let [user, setUser] = useState(null)
  const [userStatus, setUserStatus] = useState('offline')
  const [isMenuInvoked, setMenuInvoked] = useState(false);
  const [headerIcon, setHeaderIcon] = useState(defaultHeaderIcon);
  const [onHeaderIconClick, setOnHeaderIconClick] = useState();
  const [view, setView] = useState(<></>);

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

  const resetHeaderIcon = () => {
    setHeaderIcon(defaultHeaderIcon);
    setOnHeaderIconClick(() => { });
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
        const action = onHeaderIconClick ? onHeaderIconClick : () => { setMenuInvoked(!isMenuInvoked) };
        const headerUtils = { setHeaderIcon, setOnHeaderIconClick, resetHeaderIcon };
        setView(
          <>
            <Header user={user} userStatus={userStatus} isMenuInvoked={isMenuInvoked} setMenuInvoked={setMenuInvoked} icon={headerIcon} onIconClick={action}></Header>
            <Menu styles={{ display: isMenuInvoked ? 'flex' : 'none' }} menuSelectionCallback={menuSelectionCallback}></Menu>
            <App styles={{ display: !isMenuInvoked ? 'flex' : 'none' }} user={user} setUserStatus={setUserStatus} {...headerUtils}></App>
          </>
        );
      }
    }

    checkUserAndSetView()
  }, [user, userStatus, isMenuInvoked, headerIcon,]);

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
