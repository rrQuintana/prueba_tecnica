const http = require('http');
const app = require('./app');
const logger = require('./utils/logger');
const sequelize = require('./utils/sequelize');
require('./models/user.model');
require('./models/role.model');

const server = http.createServer(app);

async function startServer() {
  try {
    await sequelize.sync();

    logger.info('Connection to the database has been established successfully');

    server.listen(process.env.SERVER_PORT, () => {
      logger.info(`Server running on port ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}

startServer();
