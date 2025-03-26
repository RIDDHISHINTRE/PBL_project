// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../../utils/axiosInstance";

// const UpcomingEvents = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUpcomingEvents = async () => {
//       try {
//         const response = await axiosInstance.get("/events/");
//         setEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching upcoming events:", error);
//       }
//     };

//     fetchUpcomingEvents();
//   }, []);

//   return (
//     <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
//       <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-700 pb-2">
//         Upcoming Events
//       </h2>
//       {events.length === 0 ? (
//         <p className="text-gray-400">No upcoming events</p>
//       ) : (
//         <ul className="space-y-4">
//           {events.map((event) => (
//             <li
//               key={event.id}
//               className="cursor-pointer hover:text-gray-300 bg-gray-700 p-4 rounded-lg"
//               onClick={() => navigate("/events")}
//             >
//               {event.title} - {new Date(event.date).toLocaleDateString()}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default UpcomingEvents;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axiosInstance.get("/events/");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
    fetchUpcomingEvents();
  }, []);

  return (
    <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300">
      <h2 className="text-3xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
        Upcoming Events
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-600">No upcoming events.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="cursor-pointer hover:bg-gray-100 p-4 rounded-lg transition duration-300"
              onClick={() => navigate("/events")}
            >
              {event.title} - {new Date(event.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;
