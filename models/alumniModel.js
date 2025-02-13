const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Alumni = sequelize.define('Alumni', {
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
  graduation_year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1900,
      max: new Date().getFullYear(),
    },
  },
}, {
  schema: 'alumni', // Use a separate schema for alumni
});

// Hash password before saving
Alumni.beforeCreate(async (alumni) => {
  const salt = await bcrypt.genSalt(10);
  alumni.password = await bcrypt.hash(alumni.password, salt);
});

// Method to validate password
Alumni.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = Alumni;