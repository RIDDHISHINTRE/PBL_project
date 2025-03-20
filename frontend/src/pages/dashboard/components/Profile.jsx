
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditStudentProfile = () => {
  const navigate = useNavigate();

  // State for student profile data
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    collegeid: "",
    branch: "",
    year: "",
    bio: "",
    password: "",
  });

  // Fetch current student data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await axiosInstance.get(`/student/${id}`); 
        setStudentData(response.data);
      } catch (error) {
         console.log(error);
        console.log("Error !!!!!");
      }
    };
    fetchProfile();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  // Handle profile update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const id = localStorage.getItem("id");
      await axiosInstance.put(`/student/edit/${id}`, studentData);
      alert("Profile updated successfully!");
      navigate("/student-dashboard"); 
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  
  

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Email (Non-editable) */}
        <div className="mb-4">
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            className="w-full border p-2 rounded-md bg-gray-100"
            disabled
          />
        </div>

        {/* College ID */}
        <div className="mb-4">
          <label className="block font-medium">College ID:</label>
          <input
            type="text"
            name="collegeid"
            value={studentData.collegeid}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Branch */}
        <div className="mb-4">
          <label className="block font-medium">Branch:</label>
          <select
            name="branch"
            value={studentData.branch}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="comp">Computer Engineering</option>
            <option value="it">Information Technology</option>
            <option value="aids">AI & Data Science</option>
            <option value="entc">Electronics & Telecommunication</option>
            <option value="ece">Electronics & Computer Engineering</option>
          </select>
        </div>

        {/* Year */}
        <div className="mb-4">
          <label className="block font-medium">Year:</label>
          <select
            name="year"
            value={studentData.year}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="first">First Year</option>
            <option value="second">Second Year</option>
            <option value="third">Third Year</option>
            <option value="fourth">Fourth Year</option>
          </select>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block font-medium">Bio:</label>
          <textarea
            name="bio"
            value={studentData.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="Write a short bio..."
          />
        </div>

        {/* Password (Optional) */}
        <div className="mb-4">
          <label className="block font-medium">New Password (Optional):</label>
          <input
            type="password"
            name="password"
            value={studentData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter new password (if changing)"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditStudentProfile;