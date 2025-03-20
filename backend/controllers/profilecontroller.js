const bcrypt = require('bcryptjs');
const  Student =require('../models/studentModel');

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

module.exports = {
  updateStudentProfile,
};