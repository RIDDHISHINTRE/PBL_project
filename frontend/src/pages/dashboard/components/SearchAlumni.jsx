
import React, { useState } from "react";

const dummyAlumni = [
  {
    id: 1,
    name: "Alice Johnson",
    experience: "3 years",
    company: "Google",
    role: "Frontend Developer",
    branch: "CSE",
    image: "https://via.placeholder.com/150",
    bio: "Alice is a skilled frontend developer with expertise in React and Tailwind CSS."
  },
  {
    id: 2,
    name: "Bob Smith",
    experience: "5 years",
    company: "Microsoft",
    role: "Backend Developer",
    branch: "IT",
    image: "https://via.placeholder.com/150",
    bio: "Bob specializes in building scalable backend systems using Node.js and PostgreSQL."
  },
  {
    id: 3,
    name: "Charlie Brown",
    experience: "2 years",
    company: "Amazon",
    role: "Full Stack Developer",
    branch: "ECE",
    image: "https://via.placeholder.com/150",
    bio: "Charlie is a full stack developer passionate about MERN stack development."
  }
];

const SearchAlumni = () => {
  const [selectedFilter, setSelectedFilter] = useState("experience");
  const [filterValue, setFilterValue] = useState("");
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);

  const handleSearch = () => {
    const filtered = dummyAlumni.filter((alumni) =>
      alumni[selectedFilter]?.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredAlumni(filtered);
    setSelectedAlumni(null); // Reset selected profile on new search
  };

  return (
    <div className="bg-black w-screen h-screen text-white">
      <h2 className="text-3xl text-center mb-3 font-semibold mb-6">Search Alumni</h2>
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6">
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border rounded-lg p-2 bg-gray-800 text-white"
          >
            <option value="experience">Experience</option>
            <option value="company">Company</option>
            <option value="role">Role</option>
            <option value="branch">Branch</option>
          </select>

          <input
            className="border rounded-lg p-2 bg-gray-800 text-white"
            placeholder={`Enter ${selectedFilter}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg md:col-span-3"
          >
            Search
          </button>
        </div>

        {/* Alumni List */}
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <div
                key={alumni.id}
                onClick={() => setSelectedAlumni(alumni)}
                className="cursor-pointer bg-gray-800 p-4 rounded-lg shadow hover:bg-gray-700 transition"
              >
                <img
                  src={alumni.image}
                  alt={alumni.name}
                  className="rounded-full w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-center">{alumni.name}</h3>
                <p className="text-sm text-gray-400 text-center">{alumni.role}</p>
                <p className="text-sm text-gray-400 text-center">{alumni.company}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No alumni found. Try a different search.</p>
        )}

        {/* Alumni Profile Details */}
        {selectedAlumni && (
          <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={selectedAlumni.image}
                alt={selectedAlumni.name}
                className="rounded-full w-32 h-32"
              />
              <div>
                <h3 className="text-2xl font-semibold">{selectedAlumni.name}</h3>
                <p className="text-gray-400 mb-2">{selectedAlumni.role} at {selectedAlumni.company}</p>
                <p className="text-gray-400 mb-2">Experience: {selectedAlumni.experience}</p>
                <p className="text-gray-400 mb-2">Branch: {selectedAlumni.branch}</p>
                <p className="text-gray-300 mt-4">{selectedAlumni.bio}</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-xl font-semibold mb-2">Chat with {selectedAlumni.name}</h4>
              <textarea
                placeholder="Write your message..."
                className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none"
                rows="4"
              ></textarea>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg mt-3">
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAlumni;






