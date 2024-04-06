const morgan = require('morgan');

morgan.token('statusColor', (req, res) => {
  var status = (typeof res.headersSent !== 'boolean' ? Boolean(res.header) : res.headersSent)
    ? res.statusCode
    : undefined;

  var color = status >= 500 ? 31
    : status >= 400 ? 33
      : status >= 300 ? 36
        : status >= 200 ? 32
          : 0;

  return '\x1b[' + color + 'm' + status + '\x1b[0m';
});

morgan.token('body', function (req) {
  return JSON.stringify(req.body);
});

module.exports = morgan;