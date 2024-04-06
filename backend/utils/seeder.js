const { Sequelize } = require('sequelize');
require('dotenv').config();
const seedRoles = require('./seeders/roleSeeder');
const seedUsers = require('./seeders/userSeeder');
const initModels = require('../models');

async function runSeeder() {
  try {

    const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });


    await sequelize.sync({ force: true });
    console.log('Todas las tablas sincronizadas correctamente');

    await initModels(sequelize)

    await seedRoles();
    await seedUsers();

    console.log('Seeders insertados correctamente');

    await sequelize.close();
    console.log('Conexión cerrada correctamente');

    process.exit(0);
  } catch (error) {
    console.error('Error al ejecutar el seeder:', error);
    process.exit(1);
  }
}

runSeeder();
