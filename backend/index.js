const app = require('./app')
const http = require('http')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(process.env.SERVER_PORT, () => {
  logger.info(`Server running on port ${process.env.SERVER_PORT}`)
})