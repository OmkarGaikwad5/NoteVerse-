import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ showAlert }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Login failed. Please try again.");
        showAlert("Login Failed", "danger");
        return;
      }

     if (data.token) {
  localStorage.setItem("token", data.token);
  showAlert("Login Successful", "success");

  // 🔥 Dispatch custom event
  window.dispatchEvent(new Event("authChanged"));

  navigate("/");
}

    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Network error. Please try again.");
      showAlert("Network error", "danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow-lg p-5"
        style={{ width: '100%', maxWidth: '380px', borderRadius: '12px' }}
      >
        <h2 className="text-center mb-4 text-primary">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control shadow-sm border-0 p-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control shadow-sm border-0 p-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 shadow-sm border-0 mb-3"
          >
            Login
          </button>

          {errorMsg && (
            <div className="alert alert-danger mt-3 shadow-sm">{errorMsg}</div>
          )}
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-decoration-none text-primary">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
