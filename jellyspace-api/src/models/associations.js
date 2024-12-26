// src/models/associations.js
const sequelize = require('../config/db');
const Project = require('./project');
const Bid = require('./bid');

// Define associations here
Project.hasMany(Bid, { foreignKey: 'projectId', as: 'bids' });
Bid.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });