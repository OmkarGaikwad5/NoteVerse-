import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3 position-relative overflow-hidden">
      
      {/* ✅ Background Layer */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          zIndex: -2,
          transform: "rotate(180deg)",
          background: "radial-gradient(60% 120% at 50% 50%, hsla(0,0%,100%,0) 0, rgba(252,205,238,0.5) 100%)",
          backgroundColor: "#ffffff",
        }}
      ></div>

      <h1 className="mb-4 fw-bold">Welcome to NoteVerse 📝</h1>
      <p className="mb-5 lead">Your secure and elegant note manager.</p>

      <div className="d-flex gap-3 mt-4">
        {/* 🚀 Explore Button → Login */}
        <button
          className="fw-semibold rounded-pill border-0 px-4 py-2 text-white"
          style={{
            background: "linear-gradient(to right, #00c9ff, #92fe9d)",
            boxShadow: "0 4px 14px rgba(0, 201, 255, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 18px rgba(0, 201, 255, 0.6)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(0, 201, 255, 0.4)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onClick={() => navigate("/login")}
        >
          🚀 Explore
        </button>

        {/* ✨ Sign Up Button */}
        <button
          className="fw-semibold rounded-pill border-0 px-4 py-2 text-white"
          style={{
            background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
            boxShadow: "0 4px 14px rgba(138, 43, 226, 0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(138, 43, 226, 0.7)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(138, 43, 226, 0.4)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onClick={() => navigate("/signup")}
        >
          ✨ Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
