import logo from './logo.svg';
import './App.css';
import MixedChart from './components/MixedChart'

function App() {
  return (
    <div className="App">

     <MixedChart 
      labels={["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
     />
    </div>
  );
}

export default App;
