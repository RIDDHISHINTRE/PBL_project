import React , { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import './password.css'
const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
      e.preventDefault();
      try {
        await axiosInstance.post("/forgot-password", { email });
        alert("Password reset link sent to your email!");
      
      } catch (error) {
        console.error(error.response?.data || "Forgot Password failed");
      }
   }

return (
    <div className="container">
      <div className="form">
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleForgotPassword}>Send Reset Link</button>
      </div>
    </div>
  );
};

export default ForgotPassword;