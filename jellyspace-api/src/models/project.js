const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Assumes your Sequelize instance is in config/db

const Project = sequelize.define('Project', {
  projectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  projectDescription: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  billingProcess: {
    type: DataTypes.STRING,
    allowNull: true
  },
  budget: {
    type: DataTypes.STRING,
    allowNull: true
  },
  projectType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userEmail: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  }
}, {
  timestamps: false, // Disable automatic timestamps
  tableName: 'projects'
});



// Export the model
module.exports = Project;