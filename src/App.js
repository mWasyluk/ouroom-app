import './App.css';
import useWindowDimensions from './utils/window-resizer';
import WebSocketService from './components/WebSocketService';

function App() {
  const { height, width } = useWindowDimensions();
  const margin = 10;

  return (
    <div className="App" style={{
      margin: margin + "px",
      width: width - 2 * margin,
      height: height - 2 * margin,
    }}>


      <h1 style={{ backgroundColor: "lightblue" }}>OuRoom!</h1>
      <WebSocketService userId={"randomID"}></WebSocketService>
    </div >
  );
}

export default App;
