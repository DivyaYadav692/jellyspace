const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Assumes your Sequelize instance is in config/db

// Define the Bid model
const Bid = sequelize.define('Bid', {
  projectId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'projects', // Reference to the Project table
      key: 'id'
    }
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  projectEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  rupeesId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bidAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  bidDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  }
}, {
  timestamps: true,
  tableName: 'bids'
});

// Export the model
module.exports = Bid;