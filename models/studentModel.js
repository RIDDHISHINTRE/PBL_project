const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100],
    },
  },
  collegeid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
}, {
  schema: 'student', // Use a separate schema for students
});

// Hash password before saving
Student.beforeCreate(async (student) => {
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);
});

// Method to validate password
Student.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Student;