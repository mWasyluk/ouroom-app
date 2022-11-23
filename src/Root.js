import './Root.css';
import useWindowDimensions from './utils/window-resizer';
import Header from './components/Header';
import App from './components/App';

function Root() {
  const { height, width } = useWindowDimensions();
  const margin = 10;

  return (
    <div className="root" style={{
      margin: margin + "px",
      width: width - 2 * margin,
      height: height - 2 * margin,
    }}>
      <Header></Header>
      <App></App>
    </div >
  );
}

export default Root;
