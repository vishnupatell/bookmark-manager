import React from 'react';
import bookmarkImage from './assets/bookmarkImage.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import Signup from './components/Signup';
import Login from './components/Login';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="bg-gradient-to-r from-teal-600 to-teal-950 w-full h-[80px] sticky top-0 shadow-lg">
          <div className="flex justify-between items-center w-full px-8">
            {/* Logo and Image */}
            <div className="flex items-center justify-center mt-3">
              <img
                src={bookmarkImage}
                alt="Bookmark Logo"
                className="w-[60px] h-[60px] rounded-lg"
              />
            </div>

            
            <div className="flex space-x-6">
              <Link to="/" className="text-lg font-semibold text-white hover:text-teal-200 transition-all">
                Home
              </Link>
              <Link to="/signup" className="text-lg font-semibold text-white hover:text-teal-200 transition-all">
                Signup
              </Link>
              <Link to="/login" className="text-lg font-semibold text-white hover:text-teal-200 transition-all">
                Login
              </Link>
            </div>
          </div>
        </nav>

        {/* Body (Main Content) */}
        <div className="min-h-screen bg-gray-50">
          {/* Routes */}
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
