import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (name.trim().length < 3) {
      setErrorMsg("Name must be at least 3 characters.");
      return;
    }

    if (password.trim().length < 5) {
      setErrorMsg("Password must be at least 5 characters.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/api/auth/createuser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Signup failed.");
        toast.error("Signup Failed");
        return;
      }

      setSuccessMsg("Signup successful! Redirecting...");
      toast.success("Signup Successful");
      localStorage.setItem("token", data.token);
      setTimeout(() => navigate("/login"), 500);

    } catch (error) {
      setErrorMsg("Network error. Please try again.");
      toast.error("Network error during signup", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div
        className="card shadow-lg p-5"
        style={{ width: '100%', maxWidth: '420px', borderRadius: '10px' }}
      >
        <h2 className="text-center mb-4 text-primary">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control shadow-sm border-0 p-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control shadow-sm border-0 p-3"
              placeholder="Email address"
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
              autoComplete="new-password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 shadow-sm border-0"
          >
            Sign Up
          </button>

          {errorMsg && (
            <div className="toast toast-error mt-3 shadow-sm">{errorMsg}</div>
          )}
          {successMsg && (
            <div className="toast toast-success mt-3 shadow-sm">{successMsg}</div>
          )}
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none text-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
