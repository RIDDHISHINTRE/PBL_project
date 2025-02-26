import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const [role, setRole] = useState("student"); // or "alumni"
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "student") navigate("/student-dashboard");
    else if (role === "alumni") navigate("/alumni-dashboard");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h2 className="text-white text-3xl mb-4">Login / Signup</h2>
      <select
        onChange={(e) => setRole(e.target.value)}
        className="p-2 rounded-lg mb-4 bg-gray-800 text-white"
      >
        <option value="student">Student</option>
        <option value="alumni">Alumni</option>
      </select>
      <button
        onClick={handleLogin}
        className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-2xl"
      >
        Login
      </button>
    </div>
  );
};

export default LoginSignup;
