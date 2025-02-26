import React, { useState } from "react";
import axiosInstance from '../../utils/axiosInstance';
import { useParams} from "react-router-dom";
import './password.css'

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
 

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/reset-password/${token}`, { newPassword: password });
      alert("Password reset successful!");
     
    } catch (error) {
      console.error(error.response?.data || "Reset Password failed");
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          name="newPassword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;
