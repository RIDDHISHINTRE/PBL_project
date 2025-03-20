import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    description: "",
    location: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // const user = JSON.parse(localStorage.getItem("user"));
 

    // if (!user) {
    //   setError("User not found. Please log in.");
    //   return;
    // }

    try {
      const res = await axiosInstance.post(
        "/events/",
        { ...eventData },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Event created successfully!");
      navigate("/dashboard"); // Redirect back to dashboard
    } catch (err) {
    console.log(err);
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold mb-4">Create Event</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventData.title}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 rounded"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={eventData.location}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 rounded"
            rows="4"
            required
          />
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded text-white">
            Create Event
          </button>
        </form>
        <button onClick={() => navigate("/dashboard")} className="mt-4 w-full bg-gray-500 hover:bg-gray-600 p-3 rounded text-white">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateEvent;