import logo from './logo.svg';
import './App.css';
import './pages/Survey.js'
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Survey</h1>
      <Link to="/survey">
        <button>Start Survey</button>
      </Link>

    </div>
  );
}

export default App;
