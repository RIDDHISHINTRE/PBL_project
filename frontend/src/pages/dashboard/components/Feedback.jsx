import React from "react";

const FeedbackForm = ({ onClose }) => (
  <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-3xl shadow-2xl text-white relative">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
    >
      &times;
    </button>
    <h2 className="text-3xl font-bold mb-6 text-center">Feedback Form</h2>
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <textarea
        rows="5"
        placeholder="Your Feedback"
        className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      ></textarea>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
      >
        Submit Feedback
      </button>
    </form>
  </div>
);

export default FeedbackForm;


