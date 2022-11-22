import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="">
        <Navbar />
        <Routes>
          <Route path="/about" element={<>merge about</>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
