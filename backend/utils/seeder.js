require('dotenv').config();
const seedRoles = require('./seeders/roleSeeder');
const seedUsers = require('./seeders/userSeeder');
const sequelize = require('./sequelize');
const logger = require('./logger');

async function runSeeder() {
  try {
    await sequelize.sync({ force: true });
    logger.info('Todas las tablas sincronizadas correctamente');

    await seedRoles();
    logger.info('Roles insertados correctamente');

    await seedUsers();
    logger.info('Usuarios insertados correctamente');

    await sequelize.close();
    logger.info('Conexión cerrada correctamente');

    process.exit(0);
  } catch (error) {
    logger.error('Error en el seeder:', error);
    process.exit(1);
  }
}

runSeeder();
