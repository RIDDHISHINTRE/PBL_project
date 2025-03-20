const Student = require('../models/studentModel');

const getStudentProfile = async (req, res) => {
  try {

    console.log("Request Params:", req.params);
    console.log("Request Body:", req.body);
    console.log("Request Query:", req.query);
    
    const { id } = req.params;
    
    // Find student by primary key (ID)
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Remove sensitive fields like password before sending the response
    const { password, ...studentData } = student.toJSON();

    res.status(200).json(studentData);
  } catch (error) {
  
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getStudentProfile,
};