/* eslint-disable no-nested-ternary */
/**
 * Middleware de registro de solicitudes HTTP utilizando Morgan.
 * @module utils/morganMiddleware
 */

const morgan = require('morgan');

/**
 * Token personalizado para Morgan que devuelve el código de estado HTTP con color.
 * @name statusColor
 * @function
 * @param {object} req - Objeto de solicitud HTTP.
 * @param {object} res - Objeto de respuesta HTTP.
 * @returns {string} - Código de estado HTTP con color ANSI.
 */
morgan.token('statusColor', (req, res) => {
  const status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
    ? res.statusCode
    : undefined;

  const color = status >= 500 ? 31
    : status >= 400 ? 33
      : status >= 300 ? 36
        : status >= 200 ? 32
          : 0;

  return `\x1b[${color}m${status}\x1b[0m`; // Devuelve el código de estado HTTP con color ANSI
});

/**
 * Token personalizado para Morgan que devuelve el cuerpo de la solicitud HTTP como una cadena JSON.
 * @name body
 * @function
 * @param {object} req - Objeto de solicitud HTTP.
 * @returns {string} - Cuerpo de la solicitud HTTP como una cadena JSON.
 */
morgan.token('body', (req) => JSON.stringify(req.body)); // Devuelve el cuerpo de la solicitud HTTP como una cadena JSON

module.exports = morgan;
