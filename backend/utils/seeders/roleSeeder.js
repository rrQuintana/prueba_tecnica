const logger = require('../logger');
const Role = require('../../models/role.model');

const roles = [
  {
    name: 'Admin',
    description: 'Administrador del sistema',
  },
  {
    name: 'User',
    description: 'Usuario regular del sistema',
  },
];

async function seedRoles() {
  try {
    await Role.sync({ force: true });
    await Role.bulkCreate(roles);
    logger.info('Roles sembrados correctamente');
  } catch (error) {
    logger.error('Error al sembrar roles:', error);
  }
}

module.exports = seedRoles;
