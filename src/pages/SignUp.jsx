import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 


function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (name.trim().length < 3) {
      setErrorMsg("Name must be at least 3 characters.");
      toast.error("Name too short");
      return;
    }

    if (password.trim().length < 5) {
      setErrorMsg("Password must be at least 5 characters.");
      toast.error("Password too short");
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
        const message = data.message || data.error || "Signup failed.";
        setErrorMsg(message);
        toast.error(message);
        return;
      }

      setSuccessMsg("Signup successful! Redirecting...");
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("authChanged"));
      navigate("/home");
      toast.success("Signup successful!");

      // // ✅ Delay toast to ensure it's visible before unmount
      // setTimeout(() => {
      // }, 1000);

    } catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Network error. Please try again.");
      toast.error("Network error. Please try again.");
    }
  };

  return (
   <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-gradient px-3 px-sm-5">
  <div
    className="card shadow-lg p-4 p-md-5 w-100"
    style={{
      maxWidth: '420px',
      borderRadius: '10px',
    }}
  >
    <h2 className="text-center mb-4 text-primary">Create Account</h2>

    <form onSubmit={handleSubmit}>
      {/* Full Name */}
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

      {/* Email */}
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

      {/* Password with Eye Toggle */}
      <div className="mb-3 position-relative">
        <input
          type={showPassword ? "text" : "password"}
          className="form-control shadow-sm border-0 p-3 pe-5"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
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

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-100 py-2 shadow-sm border-0"
      >
        Sign Up
      </button>

      {/* Messages */}
      {errorMsg && (
        <div className="text-danger text-center mt-3">{errorMsg}</div>
      )}
      {successMsg && (
        <div className="text-success text-center mt-3">{successMsg}</div>
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
