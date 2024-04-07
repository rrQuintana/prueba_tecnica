const express = require('express');
const userRouter = require('./user.routes');
const roleRouter = require('./role.routes');
const loginRouter = require('./login.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);

  router.use('/users', userRouter);
  router.use('/roles', roleRouter);
  router.use('/login', loginRouter);
}

module.exports = routerApi;
