import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Loading from './components/Loading'; // Import the Loading component
import Navbar from './components/home/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <LoadingWrapper />
    </BrowserRouter>
  );
}

function LoadingWrapper() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {/* Display the Loading component while the new page is being loaded */}
      {loading && <Loading />}
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
