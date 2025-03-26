const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: process.env.DB_SSL === "true" ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    } : {}
  }
);

// Authenticate and Sync the Database
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected...');

  })
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch((err) => console.error('Error: ' + err));

module.exports = sequelize;
