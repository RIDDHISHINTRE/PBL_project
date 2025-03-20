// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const authMiddleware = (req, res, next) => {
//     const authHeader = req.header("Authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     const token = authHeader.split(" ")[1]; // Extract token

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Ensure decoded token includes `id`
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Invalid token" });
//     }
// };

// const jobOwnerMiddleware = async (req, res, next) => {
//     try {
//         const { id } = req.params; // Job ID from URL
//         const job = await Job.findByPk(id);

//         if (!job) {
//             return res.status(404).json({ message: "Job not found" });
//         }

//         // Check if the logged-in user is the job creator
//         if (job.createdBy !== req.user.id) {
//             return res.status(403).json({ message: "Unauthorized to delete this job" });
//         }

//         next(); // Allow deletion
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error });
//     }
// };

// module.exports = { authMiddleware, jobOwnerMiddleware};



const jwt = require("jsonwebtoken");
const  Job  = require("../models/JobModel"); // ✅ FIXED: Import Job model
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ensure decoded token includes `id`
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// ✅ Middleware to check if the logged-in user is the owner of the job
const jobOwnerMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params; // Job ID from URL
        const job = await Job.findByPk(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check if the logged-in user is the job creator
        if (job.createdBy !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this job" });
        }

        next(); // Allow deletion
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = { authMiddleware, jobOwnerMiddleware };

