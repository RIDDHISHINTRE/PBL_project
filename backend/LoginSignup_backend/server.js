const express = require('express');
const sequelize = require('../LoginSignup_backend/config/database');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('../LoginSignup_backend/routes/authroutes');
const passwordroutes = require('../LoginSignup_backend/routes/passwordRoutes');
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 

// Routes
app.use('/api', authRoutes);
app.use('/api' ,passwordroutes)
console.log("helloo");
// Sync database and start server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(5000, () => {
      console.log(`Server is running on port 5000`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
