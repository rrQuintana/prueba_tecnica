const { DataTypes } = require('sequelize');
const sequelize = require('../utils/sequelize');
const User = require('./user.model');

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'roles',
  timestamps: false,
});

Role.hasMany(User, {
  foreignKey: 'roleId',
  sourceKey: 'id',
});

User.belongsTo(Role, {
  foreignKey: 'roleId',
  targetId: 'id',
});

module.exports = Role;
