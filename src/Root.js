import './Root.css';
import useWindowDimensions from './utils/window-resizer';
import Header from './components/Header';
import App from './components/App';
import { useState } from 'react';

function Root() {
  const { height, width } = useWindowDimensions();
  const margin = 10;

  let [user, setUser] = useState()
  let [userStatus, setUserStatus] = useState('offline')

  // user = {
  //   id: '6b84e369-28fa-456d-83ff-b19de75ad6bb',
  //   name: 'Marek Wasyluk'
  // }

  return (
    <div className="root" style={{
      margin: margin + "px",
      width: width - 2 * margin,
      height: height - 2 * margin,
      minWidth: "500px",
    }}>
      <Header user={user} userStatus={userStatus}></Header>
      <App user={user} setUser={setUser} setUserStatus={setUserStatus}></App>
    </div >
  );
}

export default Root;
