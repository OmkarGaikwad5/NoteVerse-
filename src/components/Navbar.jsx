import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Navbar.css"

function Navbar() {
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

    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${mode}-mode`);
    localStorage.setItem('mode', mode);

    checkAuth();

    window.addEventListener("authChanged", checkAuth);
    return () => window.removeEventListener("authChanged", checkAuth);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const isDark = mode === 'dark';

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChanged"));
    navigate("/landing");
    toast.success("Logged out successfully");
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
        minHeight: '80px',
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
  {/* Show navbar items only if NOT on landing page */}
  {location.pathname !== "/landing" && (
    <>
      {isLoggedIn && (
       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  <li className="nav-item me-3">
    <Link
      className={`nav-link fw-semibold px-3 py-2 rounded text-center ${
        location.pathname === "/" ? "active-nav" : ""
      }`}
      to="/"
      style={{
        color: isDark ? "#ffffffcc" : "#333",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.color = isDark ? "#00e6e6" : "#000";
        e.currentTarget.style.borderRadius = "12px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = isDark ? "#ffffffcc" : "#333";
      }}
    >
      Home
    </Link>
  </li>

  <li className="nav-item">
    <Link
      className={`nav-link fw-semibold px-3 py-2 rounded text-center ${
        location.pathname === "/about" ? "active-nav" : ""
      }`}
      to="/about"
      style={{
        color: isDark ? "#ffffffcc" : "#333",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isDark
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.05)";
        e.currentTarget.style.color = isDark ? "#00e6e6" : "#000";
        e.currentTarget.style.borderRadius = "12px";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = isDark ? "#ffffffcc" : "#333";
      }}
    >
      About
    </Link>
  </li>
</ul>

      )}

      {/* Dark Mode Toggle */}
      {isLoggedIn && (
        <div className="d-flex align-items-center mt-2 mb-2" style={{ gap: '6px', marginRight: '1rem' }}>
          <label className="switch mb-0">
            <input type="checkbox" checked={isDark} onChange={toggleMode} />
            <span className="slider round"></span>
          </label>
          <span className={`mode-label ${isDark ? 'text-light' : 'text-dark'}`} style={{ fontSize: '1rem' }}>
            {isDark ? '🌙' : '🌞'}
          </span>
        </div>
      )}

      {/* Search Input */}
      {isLoggedIn && (
        <div
          className="position-relative"
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

      {/* Logout or Auth Buttons */}
     {isLoggedIn ? (
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
) : (
  location.pathname !== "/landing" &&
  location.pathname !== "/login" &&
  location.pathname !== "/signup" && (
    <div className="d-flex gap-2 ms-auto">
      <Link to="/login">
        <button className="btn btn-outline-primary rounded-pill px-4">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn btn-primary rounded-pill px-4">Sign Up</button>
      </Link>
    </div>
  )
)}

    </>
  )}
</div>

      </div>
    </nav>
  );
}

export default Navbar;
