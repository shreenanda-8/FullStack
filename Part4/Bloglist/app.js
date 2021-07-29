const express = require('express')
const cors = require('cors')
require('express-async-errors')
const app = express()
const dotenv = require('dotenv')

const middleware = require('./utils/middleware.js')
const blogServer = require('./controllers/blogs.js')
const userServer = require('./controllers/users.js')
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/users', userServer)
app.use('/api/blogs', blogServer)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app