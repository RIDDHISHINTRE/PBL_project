import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/dashboard/components/LandingPage";
import LoginSignup from "./pages/login_signup/loginSignup";
import ForgotPassword from "./pages/login_signup/forgotpassword";
import ResetPassword from "./pages/login_signup/resetpassword";
import StudentDashboard from "./pages/dashboard/components/Dashboard/StudentDashboard";
import AlumniDashboard from "./pages/dashboard/components/Dashboard/AlumniDashboard";
import SearchAlumni from "./pages/dashboard/components/Search_Alumni/SearchAlumni";
import CreateEvent from "./pages/dashboard/components/Events/CreateEvent";
import Event from "./pages/dashboard/components/Events/AllEvents";
import EditStudentProfile from "./pages/dashboard/components/Edit_Profile/Student_Profile";
import EditAlumniProfile from "./pages/dashboard/components/Edit_Profile/Alumni_Profile";
import EventDetails from "./pages/dashboard/components/Events/eventDetails";
import JobList from "./pages/dashboard/components/Jobs/dashJobList";
import JobListAll from "./pages/dashboard/components/Jobs/JoblistAll";
import PostJob from "./pages/dashboard/components/Jobs/PostJob";
import AlumniJobs from "./pages/dashboard/components/Jobs/AlumniJobs";
import JobDetails from "./pages/dashboard/components/Jobs/JobDetails";


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
        <Route path="/edit-student-profile" element={<EditStudentProfile/>} />
        <Route path="/edit-alumni-profile" element={<EditAlumniProfile/>} />
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
