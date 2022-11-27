import './Root.css';
import useWindowDimensions from './utils/window-resizer';
import Header from './components/Header';
import App from './components/App';
import { useState } from 'react';

function Root() {
  const { height, width } = useWindowDimensions();
  const margin = 10;

  let [user, setUser] = useState()

  return (
    <div className="root" style={{
      margin: margin + "px",
      width: width - 2 * margin,
      height: height - 2 * margin,
      minWidth: "500px",
    }}>
      <Header user={user}></Header>
      <App user={user} setUser={setUser}></App>
    </div >
  );
}

export default Root;
