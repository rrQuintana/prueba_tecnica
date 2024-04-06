const { User, userSchema } = require('./user.model');
const { Role, roleSchema } = require('./role.model');

function initModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Role.init(roleSchema, Role.config(sequelize));
}

module.exports = initModels;