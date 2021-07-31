const http = require('http')
const dotenv = require('dotenv')
const logger = require('./utils/logger.js')
const app = require('./app.js')
const server = http.createServer(app)


dotenv.config()


const PORT = process.env.PORT || 3003
server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})