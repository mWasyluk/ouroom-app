import './Root.css';
import useWindowDimensions from './utils/window-resizer';
import Header from './components/Header';
import App from './components/App';
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu';
import Account from './domains/Account';

function Root() {
  const { height, width } = useWindowDimensions();
  const margin = 10;

  let [user, setUser] = useState()
  let [userStatus, setUserStatus] = useState('offline')
  let [authToken, setAuthToken] = useState();
  let [isMenuInvoked, setMenuInvoked] = useState(false);

  // handles each of the Menu options
  let menuSelectionCallback = (optionId) => {
    switch (optionId) {
      case 'menu-item-logout':
        let date = new Date(0)
        document.cookie = 'user=;expires=' + date + ';SameSite=Strict;';
        document.cookie = 'token=;expires=' + date + ';SameSite=Strict;';
        window.location.reload()
        break;
    }
  }

  // checks if the cookies contain any user if non is logged in and set the user if needed
  if (document.cookie && (!user || !authToken)) {
    let cookies = document.cookie.split(';');
    let userValue = cookies[0].split('user=')[1];
    let tokenValue = cookies[1].split('token=')[1]

    if (userValue && tokenValue) {
      let userObject = new Account(JSON.parse(userValue));
      let token = tokenValue;

      setUser(userObject);
      setAuthToken(token);
    }
  }

  let loginView = (
    <div className="login">
      <LoginForm setAccount={setUser} setAuthToken={setAuthToken} />
    </div>
  )

  let header = <Header user={user} userStatus={userStatus} isMenuInvoked={isMenuInvoked} setMenuInvoked={setMenuInvoked}></Header>
  let menu = <Menu menuSelectionCallback={menuSelectionCallback}></Menu>
  let app = <App user={user} setUserStatus={setUserStatus} authToken={authToken}></App>

  let appView = (
    <>
      {header}
      {isMenuInvoked ? menu : app}
    </>
  )

  return (
    <div className="root" style={{
      margin: margin + "px",
      width: width - 2 * margin,
      height: height - 2 * margin,
      minWidth: "500px"
    }}>
      {user === undefined ? loginView : appView}
    </div >
  );
}

export default Root;
