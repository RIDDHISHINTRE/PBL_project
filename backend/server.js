
  const express = require('express');
  const sequelize = require('./config/database');
  require('dotenv').config();
  const cors = require('cors');
  const cron = require("node-cron"); // ✅ Import node-cron
  const deleteExpiredJobs = require('./utils/deleteExpiredJobs'); // ✅ Import job deletion function

  // Import routes
  const authRoutes = require('./routes/authroutes');
  const passwordRoutes = require('./routes/passwordRoutes');
  const eventRoutes = require('./routes/eventRoutes'); 
  const profileRoutes = require('./routes/profileRoutes');
  const jobRoutes = require('./routes/jobroutes'); // ✅ Job routes
  
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: 'http://localhost:3000', credentials: true })); 
  // app.use(express.urlencoded({ extended: true }));
  
  // Routes
  app.use('/api', authRoutes);
  app.use('/api', passwordRoutes);
  app.use('/api/events', eventRoutes); 
  app.use('/api', profileRoutes);
  app.use('/api/jobs', jobRoutes); // ✅ Add job routes
  
  console.log("Backend is running...");
  
  // Sync database and start server
  sequelize
    .sync({ force: false }) 
    .then(() => {
      app.listen(5000, () => {
        console.log(`🚀 Server is running on port 5000`);
  
        // ✅ Run deletion **once on startup**
        deleteExpiredJobs();
  
        // ✅ Schedule deletion **every day at midnight**
        cron.schedule("0 0 * * *", async () => {
          console.log("⏳ Running scheduled job deletion...");
          await deleteExpiredJobs();
        });
      });
    })
    .catch((err) => {
      console.error('❌ Unable to sync database:', err);
    });
  