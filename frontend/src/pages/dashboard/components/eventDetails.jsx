import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

const EventDetails = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
  
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      if (!token) {
        alert("Unauthorized! Please log in again.");
        navigate("/login");
        return;
      }
  
      // Fetch event details to check ownership
      const { data: event } = await axiosInstance.get(`/events/${id}`, {
        // headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Event Details:", event);
  
      await axiosInstance.delete(`/events/${event.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Event deleted successfully!");
      navigate("/event"); // Redirect back to the events list
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event: " + error.response?.data?.message || "Unknown error");
    }
  };
  
  

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="h-screen w-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md border border-gray-300">
        <h1 className="text-3xl font-semibold">{event.title}</h1>
        <p className="text-gray-600 mt-2">{event.description}</p>
        <p className="text-gray-500 mt-2">📅 Date: {new Date(event.date).toDateString()}</p>
        {event.location && (
          <p className="text-gray-500 mt-2">📍 Location: {event.location}</p>
        )}

        {/* Delete Button */}
        <button
          className="mt-6 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          onClick={handleDelete}
        >
          Delete Event
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
