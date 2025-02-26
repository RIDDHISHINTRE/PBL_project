import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/dashboard/components/LandingPage";
import LoginSignup from "./pages/login_signup/loginSignup";
import ForgotPassword from "./pages/login_signup/forgotpassword";
import ResetPassword from "./pages/login_signup/resetpassword";
import StudentDashboard from "./pages/dashboard/components/StudentDashboard";
import AlumniDashboard from "./pages/dashboard/components/AlumniDashboard";
import SearchAlumni from "./pages/dashboard/components/SearchAlumni";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/alumni-dashboard" element={<AlumniDashboard />} />
        <Route path="/search-alumni" element={<SearchAlumni />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
