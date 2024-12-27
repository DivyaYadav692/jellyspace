// models/index.js
const Bid = require('./bid');
const Project = require('./project');

// Define relationships
Project.hasMany(Bid, { foreignKey: 'id', as: 'bids' }); // Adding alias 'bids'
Bid.belongsTo(Project, { foreignKey: 'id' });


module.exports = { Bid, Project };