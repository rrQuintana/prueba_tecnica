const express = require('express');

const userRouter = express.Router();
const userController = require('../controllers/user.controller');
const middleware = require('../utils/middleware');

userRouter
  .post('/', userController.createUser)
  .get('/', userController.getUsers)
  .get('/:id', userController.getUser)
  .put('/:id', middleware.permissionExtractor, userController.updateUser)
  .delete('/:id', middleware.permissionExtractor, userController.deleteUser);

module.exports = userRouter;
