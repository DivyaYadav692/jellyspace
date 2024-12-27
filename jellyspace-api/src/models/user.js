// models/user.js

const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db'); // Adjust the path to your database config

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  accountType: {
    type: DataTypes.STRING
  },
  entityName: {
    type: DataTypes.STRING
  },
  dateOfInCorporation: {
    type: DataTypes.STRING
  },
  title: {
    type: DataTypes.STRING
  },
  mobileNo: {
    type: DataTypes.STRING
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING)
  },
  image: {
    type: DataTypes.STRING
  },
  street: {
    type: DataTypes.STRING
  },
  h_number: {
    type: DataTypes.STRING
  },
  city: {
    type: DataTypes.STRING
  },
  postalCode: {
    type: DataTypes.STRING
  },
  country: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true, // This will add `createdAt` and `updatedAt` fields
  tableName: 'Users'
});
module.exports = User;