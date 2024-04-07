/**
 * Módulo que define las rutas relacionadas con los roles.
 * @module routes/roleRouter
 */

const express = require('express');

const roleRouter = express.Router();
const roleController = require('../controllers/role.controller');
const middleware = require('../utils/middleware');

/**
 * Middleware que maneja las rutas relacionadas con los roles.
 * @name roleRouter
 * @param {string} path - Ruta base para las operaciones relacionadas con los roles.
 * @param {function} middleware.permissionExtractor - Middleware para extraer permisos del token.
 * @param {function} roleController.createRole - Controlador para crear un nuevo rol.
 * @param {function} roleController.getRoles - Controlador para obtener todos los roles.
 * @param {function} roleController.getRole - Controlador para obtener un rol por su ID.
 * @param {function} roleController.updateRole - Controlador para actualizar un rol existente.
 * @param {function} roleController.deleteRole - Controlador para eliminar un rol por su ID.
 * @returns {object} roleRouter - Enrutador para las operaciones relacionadas con los roles.
 */
roleRouter
  .post('/', middleware.permissionExtractor, roleController.createRole) // Ruta para crear un nuevo rol
  .get('/', middleware.permissionExtractor, roleController.getRoles) // Ruta para obtener todos los roles
  .get('/:id', middleware.permissionExtractor, roleController.getRole) // Ruta para obtener un rol por su ID
  .put('/:id', middleware.permissionExtractor, roleController.updateRole) // Ruta para actualizar un rol existente por su ID
  .delete('/:id', middleware.permissionExtractor, roleController.deleteRole); // Ruta para eliminar un rol por su ID

module.exports = roleRouter;
