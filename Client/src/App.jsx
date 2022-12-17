import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import SignUp from './Pages/Auth/SignUp';
import Login from './Pages/Auth/Login';
import PlayGround from './Pages/PlayGround/PlayGround';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/user';
import { useSelector } from 'react-redux';

function App() {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    console.log('try fetch response');

    const getUser = () => {
      fetch('http://localhost:3000/auth/login/success', {
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
      <div className="w-screen h-screen overflow-hidden">
        <Navbar userSet={user.isSet} user={user.user} loaded={loaded} />
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
