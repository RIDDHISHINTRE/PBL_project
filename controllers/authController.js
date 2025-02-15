const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');
const Alumni = require('../models/alumniModel');
require('dotenv').config();
const express = require('express');
// const crypto = require('crypto');
// const bcrypt = require('bcrypt');
// const nodemailer = require('nodemailer');

// const { Op } = require('sequelize');


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER, // Store in .env
//         pass: process.env.EMAIL_PASS 
//     }
// });

// const forgot = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await Student.findOne({ where: { email } });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Generate reset token & store its hashed version
//         const resetToken = crypto.randomBytes(20).toString('hex');
//         const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
//         const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry

//         await user.update({ resetToken: hashedToken, resetTokenExpiry });

//         // Send the email
//         const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: email,
//             subject: 'Password Reset',
//             text: `Click here to reset your password: ${resetLink}`
//         };

//         await transporter.sendMail(mailOptions);
//         res.json({ message: 'Password reset email sent' });

//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };
// const resetpassword = async (req, res) => {
//     const { token, newPassword } = req.body;

//     try {
//         const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

//         const user = await User.findOne({
//             where: {
//                 resetToken: hashedToken,
//                 resetTokenExpiry: { [Op.gt]: new Date() }
//             }
//         });

//         if (!user) {
//             return res.status(400).json({ message: 'Invalid or expired token' });
//         }

//         // Hash new password before saving
//         const hashedPassword = await bcrypt.hash(newPassword, 10);
//         await user.update({ 
//             password: hashedPassword, 
//             resetToken: null, 
//             resetTokenExpiry: null 
//         });

//         res.json({ message: 'Password reset successful' });

//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

// Register Student
const registerStudent = async (req, res) => {
  const { name, email, collegeid, branch, year, password } = req.body;

  if (!name || !email || !collegeid || !branch || !year || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const student = await Student.create({
      name,
      email,
      collegeid,
      branch,
      year,
      password,
    });

    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register Alumni
const registerAlumni = async (req, res) => {
  const { name, email, collegeid, branch, graduation_year, password } = req.body;

  if (!name || !email || !collegeid || !branch || !graduation_year || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingAlumni = await Alumni.findOne({ where: { email } });
    if (existingAlumni) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const alumni = await Alumni.create({
      name,
      email,
      collegeid,
      branch,
      graduation_year,
      password,
    });

    res.status(201).json({ message: 'Alumni registered successfully', alumni });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Student
const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const student = await Student.findOne({ where: { email } });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const isMatch = await student.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Alumni
const loginAlumni = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const alumni = await Alumni.findOne({ where: { email } });
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni not found' });
    }

    const isMatch = await alumni.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: alumni.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  registerStudent,
  registerAlumni,
  loginStudent,
  loginAlumni,
  // resetpassword,
  // forgot
};