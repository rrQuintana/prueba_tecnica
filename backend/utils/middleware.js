require('dotenv').config()
const jwt = require('jsonwebtoken')
const Role = require('../models/role.model')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case 'CastError':
      return res.status(400).send({ error: 'malformatted id' });
    case 'ValidationError':
      return res.status(400).json({ error: err.message });
    case 'JsonWebTokenError':
      return res.status(401).json({ error: 'invalid token' });
    case 'TokenExpiredError':
      return res.status(401).json({ error: 'token expired' });
    default:
      res.status(500).send({ error: err.message });
      break;
  }

  next(err);
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  }
  next();
}

const permissionExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);      

      if (decodedToken.roleId !== 1) {
        return res.status(403).json({ error: 'permission denied' });
      }

    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }

  next();
}


module.exports = {
  permissionExtractor,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}