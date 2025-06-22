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
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  // 🌙 Apply mode classes on body
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(`${mode}-mode`);
  localStorage.setItem('mode', mode);

  checkAuth(); // Check auth status on mount

  // ✅ Listen for global auth change
  window.addEventListener("authChanged", checkAuth);

  // ✅ Cleanup event listener
  return () => {
    window.removeEventListener("authChanged", checkAuth);
  };
}, [mode]); // 👈 Now responds to mode changes too


  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = mode === 'dark';

  const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  window.dispatchEvent(new Event("authChanged")); // 👈 dispatch logout
  showAlert("Logged out successfully", "success");
  navigate("/login");
};


  return (
    <nav
  className={`navbar navbar-expand-lg ${isDark ? 'navbar-dark' : 'navbar-light'}`}
  style={{
    background: isDark
      ? 'linear-gradient(to right, #0f2027, #203a43, #2c5364)'
      : 'linear-gradient(to right, #fdfbfb, #ebedee)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
    backdropFilter: 'blur(8px)',
    transition: 'background 0.3s ease',
    zIndex: 1030,
    minHeight: '80px', // 👈 Gives the navbar a pleasant height
    paddingTop: '10px',
    paddingBottom: '10px',
  }}
>


      <div className="container-fluid text-center">
        <Link className="navbar-brand fw-bold text-decoration-none" to="/">NoteVerse</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
       {isLoggedIn && (
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    <li className="nav-item me-4">
      <Link
        className={`nav-link text-decoration-none text-center ${location.pathname === "/" ? "active" : ""}`}
        to="/"
      >
        Home
      </Link>
    </li>
    
    <li className="nav-item">
      <Link
        className={`nav-link text-decoration-none ${location.pathname === "/about" ? "active" : ""}`}
        to="/about"
      >
        About
      </Link>
      
    </li>
    
  </ul>
  
)}






          {/* Theme toggle */}
       {isLoggedIn && (
  <div
    className="d-flex align-items-center mt-2   mb-2"
    style={{ gap: '6px', marginRight: '1rem' }}
  >
    <label className="switch mb-0 ">
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleMode}
      />
      <span className="slider round"></span>
    </label>
    <span
      className={`mode-label ${isDark ? 'text-light' : 'text-dark'}`}
      style={{ fontSize: '1rem' }}
    >
      {isDark ? '🌙' : '🌞'}
    </span>
  </div>
)}

{/* SEARCH BOX */}

        {isLoggedIn && (
  <div
    className="position-relative  "
    style={{
      borderRadius: '30px',
      background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
      padding: '6px 14px',
      display: 'flex',
      alignItems: 'center',
      boxShadow: isDark
        ? '0 0 10px rgba(0, 217, 255, 0.2)'
        : '0 0 8px rgba(0, 0, 0, 0.1)',
      transition: '0.3s ease-in-out',
      backdropFilter: 'blur(8px)',
      minWidth: '250px',
    }}
  >
   <i
  className="fas fa-search me-2 d-flex align-items-center"
  style={{
    color: isDark ? '#00d9ff' : '#333',
    fontSize: '1rem',
    height: '100%',       // Ensures it takes up full container height
    display: 'flex',       // Needed for vertical centering
    alignItems: 'center',  // Vertically center it
  }}
/>

    <input
      type="text"
      className="form-control border-0 bg-transparent p-0 shadow-none"
      placeholder="Search notes..."
      style={{
        color: isDark ? '#fff' : '#000',
        fontWeight: '500',
      }}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
)}



          {/* Auth Buttons */}
          {!isLoggedIn ? (
  <div className="d-flex gap-2 ms-auto">
    <Link to="/login">
      <button
        className="px-4 py-2 fw-semibold rounded-pill border-0 d-flex align-items-center gap-2"
        style={{
          background: 'linear-gradient(to right, #00c9ff, #92fe9d)',
          color: '#000',
          boxShadow: '0 0 12px rgba(0, 201, 255, 0.5)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 201, 255, 0.8)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 12px rgba(0, 201, 255, 0.5)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <i className="fas fa-sign-in-alt"></i> Login
      </button>
    </Link>

    <Link to="/signup">
      <button
        className="px-4 py-2 fw-semibold rounded-pill border-0 d-flex align-items-center gap-2 text-white"
        style={{
          background: 'linear-gradient(135deg, #8e2de2, #4a00e0)',
          boxShadow: '0 0 14px rgba(138, 43, 226, 0.5)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.8)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 14px rgba(138, 43, 226, 0.5)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <i className="fas fa-user-plus"></i> Sign Up
      </button>
    </Link>
  </div>
) : (
  <button
    onClick={handleLogout}
    className="gap-2 px-4 py-2 fw-semibold rounded-pill border-0 text-white"
    style={{
      background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
      boxShadow: '0 0 12px rgba(255, 65, 108, 0.6)',
      transition: 'all 0.3s ease',
      fontSize: '0.95rem',
      letterSpacing: '0.5px',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 75, 43, 0.9)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = '0 0 12px rgba(255, 65, 108, 0.6)';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
  >
    🔒 Logout
  </button>
)}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
