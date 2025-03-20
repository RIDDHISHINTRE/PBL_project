import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/dashboard/components/LandingPage";
import LoginSignup from "./pages/login_signup/loginSignup";
import ForgotPassword from "./pages/login_signup/forgotpassword";
import ResetPassword from "./pages/login_signup/resetpassword";
import StudentDashboard from "./pages/dashboard/components/StudentDashboard";
import AlumniDashboard from "./pages/dashboard/components/AlumniDashboard";
import SearchAlumni from "./pages/dashboard/components/SearchAlumni";
import CreateEvent from "./pages/dashboard/components/CreateEvent";
import Event from "./pages/dashboard/components/AllEvents";
import EditStudentProfile from "./pages/dashboard/components/Profile";
import EventDetails from "./pages/dashboard/components/eventDetails";
import JobList from "./pages/dashboard/components/dashJobList";
import JobListAll from "./pages/dashboard/components/JoblistAll";
import PostJob from "./pages/dashboard/components/PostJob";
import AlumniJobs from "./pages/dashboard/components/AlumniJobs";
import JobDetails from "./pages/dashboard/components/JobDetails";

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
        <Route path="/edit-profile" element={<EditStudentProfile/>} />
        <Route path="/createevent" element={<CreateEvent/>} />
        <Route path="/event" element={<Event/>} />
        <Route path="/event/:id" element={<EventDetails/>} />
        <Route path="/jobs" element={<JobList/>} />
        <Route path="/jobs/all" element={<JobListAll/>} />
        <Route path="/jobs/post" element={<PostJob/>} />
        <Route path="/jobs/alumni" element={<AlumniJobs/>} />
        <Route path="/job/:jobId" element={<JobDetails/>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
