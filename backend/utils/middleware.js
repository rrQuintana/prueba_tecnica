const logger = require('./logger')
const jwt = require('jsonwebtoken')

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

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}