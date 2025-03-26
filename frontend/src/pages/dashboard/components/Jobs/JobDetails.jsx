// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axiosInstance from "../../../utils/axiosInstance";

// // const JobDetails = () => {
// //   const { jobId } = useParams(); 
// //   const [job, setJob] = useState(null);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     axiosInstance
// //       .get(`/jobs/${jobId}`)
// //       .then((response) => setJob(response.data))
// //       .catch((error) => {
// //         console.error("Error fetching job:", error);
// //         setError("Failed to load job details.");
// //       });
// //   }, [jobId]);

// //   if (error) return <p className="text-red-500 text-center">{error}</p>;
// //   if (!job) return <p className="text-center text-gray-500">Loading job details...</p>;

// //   return (
// //     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
// //       <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
// //       <p className="text-gray-600">{job.location}</p>
// //       <p className="mt-4 text-gray-700">{job.description}</p>
// //       <p className="mt-2 font-semibold text-gray-800">Eligibility:</p>
// //       <p className="text-gray-700">{job.eligibility}</p>
// //       <p className="mt-2 text-sm text-gray-500">Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
// //       <a
// //         href={job.applicationLink}
// //         target="_blank"
// //         rel="noopener noreferrer"
// //         className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
// //       >
// //         Apply Now
// //       </a>
// //     </div>
// //   );
// // };

// // export default JobDetails;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axiosInstance from "../../../utils/axiosInstance";

// const JobDetails = () => {
//   const { jobId } = useParams(); 
//   const [job, setJob] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axiosInstance
//       .get(`/jobs/${jobId}`)
//       .then((response) => setJob(response.data))
//       .catch((error) => {
//         console.error("Error fetching job:", error);
//         setError("Failed to load job details. Please try again later.");
//       });
//   }, [jobId]);

//   if (error) 
//     return <p className="text-red-600 text-center font-medium">{error}</p>;
//   if (!job) 
//     return <p className="text-center text-gray-500">Loading job details...</p>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h2>
//         <p className="text-lg text-gray-600 font-medium">📍 {job.location}</p>
        
//         <div className="mt-6 border-t border-gray-300 pt-4">
//           <p className="text-gray-700 leading-relaxed">{job.description}</p>
//         </div>

//         <div className="mt-4">
//           <p className="font-semibold text-gray-800">🎓 Eligibility:</p>
//           <p className="text-gray-700">{job.eligibility}</p>
//         </div>

//         <p className="mt-2 text-sm text-gray-500 font-medium">⏳ Application Deadline: {new Date(job.deadline).toLocaleDateString()}</p>

//         <div className="mt-6 flex justify-center">
//           <a
//             href={job.applicationLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md transition"
//           >
//             Apply Now
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobDetails;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/jobs/${jobId}`)
      .then((response) => setJob(response.data))
      .catch(() => setError("Failed to load job details."));
  }, [jobId]);

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!job) return <p className="text-center text-gray-500">Loading job details...</p>;

  return (

      <div className="max-w-2xl w-full bg-white p-8 shadow-lg rounded-lg border border-gray-200">
        {/* Job Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h2>

        {/* Location */}
        <p className="text-lg font-medium text-gray-600 flex items-center gap-2">
          📍 {job.location}
        </p>

        <hr className="my-4 border-gray-300" />

        {/* Job Description */}
        <p className="text-gray-700 text-lg">{job.description}</p>

        {/* Eligibility Section */}
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            🎓 Eligibility:
          </p>
          <p className="text-gray-700">{job.eligibility}</p>
        </div>

        {/* Application Deadline */}
        <p className="mt-4 text-gray-600 flex items-center gap-2">
          ⏳ Application Deadline:{" "}
          <span className="font-semibold">{new Date(job.deadline).toLocaleDateString()}</span>
        </p>

        {/* Apply Button */}
        <a
          href={job.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-6 rounded-lg transition-all duration-300"
        >
          Apply Now
        </a>
      </div>
    
  );
};

export default JobDetails;
