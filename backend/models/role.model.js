const { Model, DataTypes } = require('sequelize');

const ROLES_TABLE = 'roles';

class Role extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: ROLES_TABLE,
      modelName: 'Role',
      timestamps: true,
    };
  }
}

const roleSchema = {
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
  }
};

module.exports = { Role, roleSchema };
