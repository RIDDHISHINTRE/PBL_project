import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, PlusCircle, User } from "lucide-react";
import FeedbackForm from "./Feedback";

const AlumniDashboard = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  const jobs = [
    { id: 1, title: "Software Engineer", company: "InnoTech", location: "Mumbai" },
    { id: 2, title: "Product Manager", company: "BizSolutions", location: "Hyderabad" },
  ];

  const events = [
    { id: 1, title: "Networking Meetup", date: "April 15, 2025" },
    { id: 2, title: "AI & Future Careers", date: "June 5, 2025" },
  ];

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center p-4 bg-gray-900 shadow-lg">
        <h1 className="text-3xl font-extrabold tracking-wide">Alumni Dashboard</h1>
        <div className="flex space-x-6 items-center text-lg">
          <Link to="/create-event" className="hover:text-gray-400 flex items-center gap-1">
            <PlusCircle className="w-5 h-5" /> Create Event
          </Link>
          <Link to="/messages" className="hover:text-gray-400 flex items-center gap-1">
            <MessageCircle className="w-5 h-5" /> Messages/Notifications
          </Link>
        </div>
        <Link
          to="/edit-profile"
          className="bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600"
        >
          <User className="w-6 h-6" />
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-grow w-full overflow-y-auto p-8 grid grid-cols-1 gap-8">
        {/* Upcoming Events Section */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-700 pb-2">
            Upcoming Events
          </h2>
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="bg-gray-700 p-4 rounded-lg hover:text-gray-300"
              >
                {event.title} - {event.date}
              </li>
            ))}
          </ul>
        </div>

        {/* Job Opportunities Section */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-700 pb-2">
            Posted Jobs
          </h2>
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="bg-gray-700 p-4 rounded-lg hover:text-gray-300"
              >
                {job.title} at {job.company} ({job.location})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Floating Feedback Button */}
      <button
        onClick={() => setShowFeedback(true)}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-full shadow-lg"
        title="Feedback"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <FeedbackForm onClose={() => setShowFeedback(false)} />
        </div>
      )}
    </div>
  );
};

export default AlumniDashboard;




