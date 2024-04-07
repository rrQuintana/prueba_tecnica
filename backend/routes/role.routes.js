const express = require('express');

const roleRouter = express.Router();
const roleController = require('../controllers/role.controller');
const middleware = require('../utils/middleware');

roleRouter
  .post('/', middleware.permissionExtractor, roleController.createRole)
  .get('/', middleware.permissionExtractor, roleController.getRoles)
  .get('/:id', middleware.permissionExtractor, roleController.getRole)
  .put('/:id', middleware.permissionExtractor, roleController.updateRole)
  .delete('/:id', middleware.permissionExtractor, roleController.deleteRole);

module.exports = roleRouter;
