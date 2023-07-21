import Navbar from './Components/Navbar/Manager.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import PlayGround from './Pages/PlayGround/PlayGround';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/user';
import { useSelector } from 'react-redux';

// const BASE_URL = 'https://seal-app-4qpjq.ondigitalocean.app/api';
const BASE_URL = import.meta.env.VITE_API_URL;

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getUser = () => {
      fetch(BASE_URL + '/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          setUser(resObject.user);
          dispatch(setUser(resObject.user));
          setLoaded(true);
        })
        .catch((err) => {
          setLoaded(true);
        });
    };
    getUser();
  }, []);

  return (
    <Router>
      <div id="rootApp" className="w-screen h-screen overflow-x-hidden">
        <Navbar userSet={user.isSet} user={user.user} loaded={loaded} />
        <Routes>
          <Route exact path="/Home" element={<Home />} />
          <Route exact path="/SignUp" element={<SignUp />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Playground" element={<PlayGround />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
