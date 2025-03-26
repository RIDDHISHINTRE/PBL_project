

// import React, { useEffect, useState } from "react";
// import { useNavigate ,Link } from "react-router-dom";
// import axiosInstance from "../../../utils/axiosInstance";
// import { PlusCircle } from "lucide-react";

// const AllEvents = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axiosInstance.get("/events/all");
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   return (
//     <div className="h-screen w-screen bg-gray-100 text-gray-900 flex flex-col">
//       {/* Navbar */}
//       <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-300">
//         <h1 className="text-2xl font-semibold">All Events</h1>
       
//         <Link to="/createevent" className="hover:text-blue-600 flex items-center gap-1">
//             <PlusCircle className="w-5 h-5" /> Create Event
//           </Link>
//       </nav>

//       {/* Events List */}
//       <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300 mt-6">
//         {/* <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
//           All Events
//         </h2> */}

//         {events.length === 0 ? (
//           <p className="text-gray-600 text-lg">No events available.</p>
//         ) : (
//           <ul className="space-y-4">
//             {events.map((event) => (
//               <li
//                 key={event.id}
//                 className="p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-300"
//                 onClick={() => navigate(`/event/${event.id}`)}
//               >
//                 <h3 className="text-xl font-semibold">{event.title}</h3>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllEvents;


import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { PlusCircle } from "lucide-react";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events/all");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold">All Events</h1>
       
        <Link to="/createevent" className="hover:text-blue-600 flex items-center gap-1">
          <PlusCircle className="w-5 h-5" /> Create Event
        </Link>
      </nav>

      {/* Events List */}
      <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300 mt-6">
        {events.length === 0 ? (
          <p className="text-gray-600 text-lg">No events available.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-300"
                onClick={() => navigate(`/event/${event.id}`)} // Navigate to EventDetails page
              >
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllEvents;


