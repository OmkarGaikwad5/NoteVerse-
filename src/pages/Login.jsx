import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
   const [showPassword, setShowPassword] = useState(false);
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
        const message = data.message || data.error || "Login failed. Please try again.";
        setErrorMsg(message);
        toast.error(message);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.dispatchEvent(new Event("authChanged"));
        navigate("/");
        // ✅ Ensure toast after navigation so it renders properly
        setTimeout(() => {
          toast.success("Login successful!");
        }, 1000);
      }

    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Network error. Please try again.");
      toast.error("Network error. Please try again.");
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
              type="email"
              className="form-control shadow-sm border-0 p-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {/* 👁 Password Field with Toggle */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control shadow-sm border-0 p-3 pe-5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer", color: "#888" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>



          <button
            type="submit"
            className="btn btn-primary w-100 py-2 shadow-sm border-0 mb-3"
          >
            Login
          </button>

          {errorMsg && (
            <div className="text-danger text-center">{errorMsg}</div>
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
