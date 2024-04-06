const { Role } = require('../../models/role.model');

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
    
    await Role.truncate({ cascade: true });
    await Role.bulkCreate(roles);

    console.log('Roles sembrados correctamente');
  } catch (error) {
    console.error('Error al sembrar roles:', error);
  }
}

module.exports = seedRoles;
