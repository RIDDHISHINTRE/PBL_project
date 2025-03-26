// const express = require("express");
// const Student = require("../models/studentModel");
// const Alumni = require("../models/alumniModel");
// const router = express.Router();

// router.get("/:userType/:id", async (req, res) => {
//   const { userType, id } = req.params;
//   console.log("Received PUT request for:", userType, id);
//   // console.log("Request Body:", req.body);
//   try {
//     const userModel = userType === "student" ? Student : Alumni;
//     const user = await userModel.findByPk(id);
    
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.put("/:userType/:id", async (req, res) => {
//   const { userType, id } = req.params;
//   const { name, email, bio, collegeid, branch, year, graduateCollegeYear, role, companyName } = req.body;
//   console.log("Received PUT request for:", userType, id);
//   console.log("Request Body:", req.body);

//   try {
//     const userModel = userType === "student" ? Student : Alumni;
//     const user = await userModel.findByPk(id);

//     if (!user) return res.status(404).json({ error: "User not found" });

//     const updateData = {
//       name, email, bio, collegeid, branch,
//       ...(userType === "student" ? { year } : { graduateCollegeYear, role, companyName })
//     };

//     await user.update(updateData);

//     res.json({ message: "Profile updated successfully", user });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

const express =require('express');
const router = express.Router();
const { getStudentProfile } =require('../controllers/getStudentcontroller')
const { updateStudentProfile }= require('../controllers/profilecontroller');
const { getAlumniProfile} = require('../controllers/getStudentcontroller');
const { updateAlumniProfile } = require('../controllers/profilecontroller');


router.get('/student/:id',getStudentProfile);
router.put('/student/edit/:id' ,updateStudentProfile);
router.get('/alumni/:id',getAlumniProfile);
router.put('/alumni/edit/:id' ,updateAlumniProfile);

module.exports =router;