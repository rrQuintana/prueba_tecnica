/* eslint-disable consistent-return */
/**
 * Middleware y funciones de utilidad relacionadas con la autenticación y la autorización.
 * @module utils/authMiddleware
 */

const jwt = require('jsonwebtoken');
const Role = require('../models/role.model');
const logger = require('./logger');

let adminRole = null;

/**
 * Busca el rol de administrador y lo asigna a la variable `adminRole`.
 * Si el rol no se encuentra, registra un error en el registro.
 */
Role.findOne({ where: { name: 'Admin' } })
  .then((role) => {
    if (role) {
      adminRole = role;
    } else {
      logger.error('Admin role not found');
    }
  })
  .catch((error) => {
    logger.error(error.message);
  });

/**
 * Manejador de solicitudes para endpoints desconocidos (404 Not Found).
 * @function unknownEndpoint
 * @param {object} request - Objeto de solicitud HTTP.
 * @param {object} response - Objeto de respuesta HTTP.
 */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

/**
 * Middleware para extraer el token de autorización de la solicitud.
 * @function tokenExtractor
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función para llamar al siguiente middleware.
 */
const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
};

/**
 * Middleware para extraer y verificar los permisos de un token JWT.
 * @async
 * @function permissionExtractor
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función para llamar al siguiente middleware.
 */
const permissionExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      if (decodedToken.roleId !== adminRole.id) {
        return res.status(403).json({ error: 'permission denied' });
      }
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }

  next();
};

/**
 * Manejador de errores para diferentes tipos de errores comunes.
 * @function errorHandler
 * @param {Error} err - Objeto de error.
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @param {function} next - Función para llamar al siguiente middleware.
 */
const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'CastError':
      return res.status(400).send({ error: 'ID mal formateada' });
    case 'ValidationError':
      return res.status(400).json({ error: err.message });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'Token inválido' });
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'Sesión expirara' });
    case 'SequelizeUniqueConstraintError':
      return res.status(400).json({ error: 'Ya existe una cuenta con ese correo' });
    case 'Credenciales inválidas':
      return res.status(401).json({ error: 'Credenciales inválidas' });
    default:
      res.status(500).send({ error: err });
  }

  next(err);
};

module.exports = {
  permissionExtractor,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
