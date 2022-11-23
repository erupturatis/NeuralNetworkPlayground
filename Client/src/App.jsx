import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import PlayGround from './Pages/PlayGround/PlayGround';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Playground" element={<PlayGround />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
