import React from "react";
import { Link } from "react-router-dom";
import alumniImage from "../assets/alumni_image.png";

const LandingPage = () => (
  <div className="min-h-screen bg-gray-100 flex">
    <div className="w-1/2 h-screen">
      <img
        src={alumniImage}
        alt="Alumni Association Portal"
        className="w-full h-full object-cover rounded-none"
      />
    </div>
    <div className="w-1/2 flex flex-col items-center justify-center text-center p-6 bg-black bg-opacity-70">
      <h1 className="text-5xl font-bold text-white mb-4">
        Welcome to the Alumni Association Portal
      </h1>
      <p className="text-xl text-gray-300 mb-8 max-w-2xl">
        Connect, collaborate, and grow with our alumni network. Find job opportunities, events, and more.
      </p>
      <Link to="/login">
        <button className="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-2xl text-lg shadow-md transition-all">
          Get Started
        </button>
      </Link>
    </div>
  </div>
);

export default LandingPage;


