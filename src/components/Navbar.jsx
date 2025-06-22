import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import "../styles/Navbar.css"

function Navbar({ showAlert }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(NoteContext);

  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'dark');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${mode}-mode`);
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = mode === 'dark';

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    showAlert("Logged out successfully", "success");
    navigate('/login');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDark ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">NoteVerse</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>

          <form className="d-flex me-3" role="search">
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search notes"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-primary" type="button">Search</button>
          </form>

          {/* Theme toggle */}
          <div className="d-flex align-items-center me-3">
            <label className="switch me-2 mb-0">
              <input type="checkbox" checked={isDark} onChange={toggleMode} />
              <span className="slider round"></span>
            </label>
            <span className={`mode-label ${isDark ? 'text-light' : 'text-dark'}`}>
              {isDark ? '🌙' : '🌞'}
            </span>
          </div>

          {/* Auth Buttons */}
          {!isLoggedIn ? (
            <div className="d-flex">
              <Link to="/login" className="me-2">
                <button className="btn btn-outline-primary px-4 py-2 rounded-pill">Login</button>
              </Link>
              <Link to="/signup">
                <button className="btn btn-primary px-4 py-2 rounded-pill">Sign Up</button>
              </Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-danger px-4 py-2 rounded-pill">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
