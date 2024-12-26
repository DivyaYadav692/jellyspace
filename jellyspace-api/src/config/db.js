const { Sequelize, DataTypes } = require('sequelize'); // Import DataTypes
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create a new Sequelize instance
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres',
});



// Sync the database and log success or failure
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Set to `true` if you want to drop and recreate the table
    console.log('Database synced successfully.');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};



// Export both sequelize and DataTypes
module.exports = { sequelize, DataTypes, syncDatabase };
