const express = require('express');
const userRouter = require('./user.routes');
const roleRouter = require('./role.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  
  router.use('/users', userRouter);
  router.use('/roles', roleRouter);
}

module.exports = routerApi;