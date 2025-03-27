const bcrypt = require('bcryptjs');
const  Student =require('../models/studentModel');
const { Alumni, WorkExperience } = require("../models/asso");


const deleteWorkExperience = async (req, res) => {
  try {
    const { deleteWorkExperienceIds } = req.body;
    const { id } = req.params; // Alumni ID from URL
    const loggedInAlumniId = req.user.id; // Extracted from token

    if (!deleteWorkExperienceIds || !Array.isArray(deleteWorkExperienceIds) || deleteWorkExperienceIds.length === 0) {
      return res.status(400).json({ message: "Invalid deleteWorkExperienceIds. Must be a non-empty array." });
    }

    // Ensure alumni can only delete their own work experience
    if (parseInt(id) !== loggedInAlumniId) {
      return res.status(403).json({ message: "Unauthorized to delete work experience of another user" });
    }

    const deletedCount = await WorkExperience.destroy({
      where: {
        id: deleteWorkExperienceIds,
        alumniId: id, // Ensures only the given alumni's work experiences are deleted
      },
    });

    if (deletedCount > 0) {
      return res.status(200).json({ message: "Work experience deleted successfully" });
    } else {
      return res.status(404).json({ message: "No matching WorkExperience records found for deletion." });
    }
  } catch (error) {
    console.error("Error deleting work experience:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const updateStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, branch, year, collegeid ,password} = req.body;

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update fields
    student.name = name || student.name;
    student.bio = bio || student.bio;
    student.branch = branch || student.branch;
    student.year = year || student.year;
    student.collegeid = collegeid || student.collegeid;

    // If password is provided, hash it before updating
    if (password) {
    
      const salt = await bcrypt.genSalt(10);
      student.password = await bcrypt.hash(password, salt);

    }

    await student.save();

    res.status(200).json({ message: 'Profile updated successfully', student });
  } catch (error) {
   
    res.status(500).json({ message: 'Internal server error' });
  }
};



const updateAlumniProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, password, collegeid, branch, graduateCollegeYear, WorkExperiences } = req.body;

    console.log("Updating Alumni Profile for ID:", id);

    let alumni = await Alumni.findByPk(id, {
      include: [{ model: WorkExperience }],
    });

    if (!alumni) {
      return res.status(404).json({ message: "Alumni not found" });
    }

    // Update Alumni Details
    alumni.name = name || alumni.name;
    alumni.bio = bio || alumni.bio;
    alumni.branch = branch || alumni.branch;
    alumni.collegeid = collegeid || alumni.collegeid;
    alumni.graduateCollegeYear = graduateCollegeYear || alumni.graduateCollegeYear;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      alumni.password = await bcrypt.hash(password, salt);
    }

    await alumni.save();
    console.log("Alumni Profile Updated:", alumni);

    // Handle WorkExperience Updates
    if (Array.isArray(WorkExperiences)) {
      for (const exp of WorkExperiences) {
        const { id: expId, companyName, role, yearsOfExperience } = exp;

        if (!companyName || !role || !yearsOfExperience) {
          console.log("Skipping invalid workExperience entry:", exp);
          continue;
        }

        if (expId) {
          const existingExp = await WorkExperience.findOne({
            where: { id: expId, alumniId: id },
          });

          if (existingExp) {
            existingExp.companyName = companyName;
            existingExp.role = role;
            existingExp.yearsOfExperience = yearsOfExperience;
            await existingExp.save();
            console.log("Updated WorkExperience:", existingExp);
          }
        } else {
          await WorkExperience.create({
            alumniId: id,
            companyName,
            role,
            yearsOfExperience,
          });
          console.log("New WorkExperience Created with alumniId:", id);
        }
      }
    } else {
      console.log("Invalid workExperience format. Expected an array.");
    }

    alumni = await Alumni.findByPk(id, {
      include: [{ model: WorkExperience }],
    });

    res.status(200).json({ message: "Profile updated successfully", alumni });
  } catch (error) {
    console.error("Error in updateAlumniProfile:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = {
  updateStudentProfile,
  updateAlumniProfile,
  deleteWorkExperience
};