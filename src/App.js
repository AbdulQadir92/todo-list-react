import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content container">
          <Routes>
            <Route exact path="/" element={ <Home /> }></Route>
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
