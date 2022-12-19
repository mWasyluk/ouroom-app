import './Root.css';
import useWindowDimensions from './utils/window-resizer';
import Header from './components/Header';
import App from './components/App';
import { useState } from 'react';
import LoginForm from './components/LoginForm';

function Root() {
  const { height, width } = useWindowDimensions();
  const margin = 10;

  let [user, setUser] = useState()
  let [userStatus, setUserStatus] = useState('offline')
  let [authToken, setAuthToken] = useState();

  let loginView = (
    <div className="login">
      <LoginForm setAccount={setUser} setAuthToken={setAuthToken} />
    </div>
  )

  let appView = (
    <>
      <Header user={user} userStatus={userStatus}></Header>
      <App user={user} setUserStatus={setUserStatus} authToken={authToken}></App>
    </>
  )


  return (
    <div className="root" style={{
      margin: margin + "px",
      width: width - 2 * margin,
      height: height - 2 * margin,
      minWidth: "500px",
    }}>
      {user === undefined ? loginView : appView}
    </div >
  );
}

export default Root;
