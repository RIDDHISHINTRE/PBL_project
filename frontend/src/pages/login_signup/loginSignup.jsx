import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {useNavigate , Link } from "react-router-dom";
import "./loginSignup.css";

const LoginSignup = () => {
  const [islogin, setlogin] = useState(true);
  const [signupstate, setsignupstate] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [studentSignupData, setStudentSignupData] = useState({
    name: "", email: "", password: "", collegeid: "", branch: "", year: "",bio:""
  });
  const [alumniSignupData, setAlumniSignupData] = useState({
    name: "", email: "", password: "", graduateCollegeYear: "",
    collegeid: "", branch: "", companyName: "", role: "", otherRole: "",bio:""
  });

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
  
    try {
      const endpoint = role === "student" ? "/student/login" : "/alumni/login";
      const response = await axiosInstance.post(endpoint, loginData);
      
      console.log("Login API Response:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType);
      localStorage.setItem("id", response.data.id);
      
      console.log("Stored ID in localStorage:", localStorage.getItem("id"));
      console.log("Stored userType in localStorage:", localStorage.getItem("userType"));

      if (role === "student") {
        navigate("/student-dashboard");
      } else {
        navigate("/alumni-dashboard");
      }
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
    }
  };
  

  // Student Signup Handler
  const handleStudentSignup = async (e) => {
    e.preventDefault();
    console.log("Student Signup Data:",studentSignupData);
    try {
      await axiosInstance.post("/student/register", studentSignupData);
      setlogin(true);
    } catch (error) {
      console.log("Student Signup Failed:", error.response?.data || error.message);
    }
  };

  // Alumni Signup Handler
  const handleAlumniSignup = async (e) => {
    e.preventDefault();
    console.log("Alumni Signup Data:",alumniSignupData);
    try {
      await axiosInstance.post("/alumni/register", alumniSignupData);
      setlogin(true);
    } catch (error) {
      console.log("Alumni Signup Failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button className={islogin ? "active" : ""} onClick={() => setlogin(true)}>Login</button>
          <button className={!islogin ? "active" : ""} onClick={() => setlogin(false)}>Signup</button>
        </div>

        {islogin ? (
          <form className="form" onSubmit={handleLogin}>
            <h2>Login Form</h2>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
            <input type="email" placeholder="Email" required onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
            <input type="password" placeholder="Password" required onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
            <button type="submit">Login</button>
            <div>
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </form>
        ) : signupstate === "" ? (
          <>
            <h2>Sign Up As</h2>
            <button className="choice-btn" onClick={() => setsignupstate("student")}>Student</button>
            <button className="choice-btn" onClick={() => setsignupstate("alumni")}>Alumni</button>
          </>
        ) : signupstate === "student" ? (
          <form className="form" onSubmit={handleStudentSignup}>
            <h2>Student Signup Form</h2>
            <input type="text" placeholder="Name" onChange={(e) => setStudentSignupData({ ...studentSignupData, name: e.target.value })} required />
            <input type="email" placeholder="Email" onChange={(e) => setStudentSignupData({ ...studentSignupData, email: e.target.value })} required />
            <input type="password" placeholder="Password" onChange={(e) => setStudentSignupData({ ...studentSignupData, password: e.target.value })} required />
            <input type="text" placeholder="College ID" onChange={(e) => setStudentSignupData({ ...studentSignupData, collegeid: e.target.value })} required />
            <select defaultValue="" onChange={(e) => setStudentSignupData({ ...studentSignupData, branch: e.target.value })} required>
              <option value="" disabled>--Branch--</option>
              <option value="comp">Computer Engineering</option>
              <option value="it">Information Technology</option>
              <option value="aids">Artificial Intelligence and Data Science</option>
              <option value="entc">Electronics and Telecommunication</option>
              <option value="ece">Electronics and Computer Engineering</option>
            </select>
            <select defaultValue="" onChange={(e) => setStudentSignupData({ ...studentSignupData, year: e.target.value })} required>
              <option value="" disabled>Year</option>
              <option value="first">First year</option>
              <option value="second">Second year</option>
              <option value="third">Third year</option>
              <option value="fourth">Fourth year</option>
            </select>
            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleAlumniSignup}>
            <h2>Alumni Signup Form</h2>
            <input type="text" placeholder="Name" onChange={(e) => setAlumniSignupData({ ...alumniSignupData, name: e.target.value })} required />
            <input type="email" placeholder="Email" onChange={(e) => setAlumniSignupData({ ...alumniSignupData, email: e.target.value })} required />
            <input type="password" placeholder="Password" onChange={(e) => setAlumniSignupData({ ...alumniSignupData, password: e.target.value })} required />
            <input type="text" placeholder="Graduate College Year" onChange={(e) => setAlumniSignupData({ ...alumniSignupData, graduateCollegeYear: e.target.value })} required />
            <input type="text" placeholder="College ID" onChange={(e) => setAlumniSignupData({ ...alumniSignupData, collegeid: e.target.value })} required />
            <select defaultValue="" onChange={(e) => setAlumniSignupData({ ...alumniSignupData, branch: e.target.value })} required>
              <option value="" disabled>--Branch--</option>
              <option value="comp">Computer Engineering</option>
              <option value="it">Information Technology</option>
              <option value="aids">Artificial Intelligence and Data Science</option>
              <option value="entc">Electronics and Telecommunication</option>
              <option value="ece">Electronics and Computer Engineering</option>
            </select>
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;


