require('dotenv').config();
const { Sequelize } = require('sequelize');
const initModels = require('../models');
const logger = require('./logger');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

sequelize.sync();
initModels(sequelize)

logger.info('Database connected');

module.exports = sequelize;