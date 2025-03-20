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

  bio: 
  { 
    type: DataTypes.TEXT
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
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: '^[a-zA-Z0-9@]+$', // Passed as a string, not RegExp
    },
  },
  branch: {
    type: DataTypes.ENUM('comp','it','ece','aids','entc'),
    allowNull: false,
  },
  graduateCollegeYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reset_token: 
  { type: DataTypes.STRING,
     allowNull: true 
  },

  reset_token_expiry:
   { type: DataTypes.DATE, 
    allowNull: true 
  }
},{
   tableName :'Alumni'
   ,timestamps: true
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