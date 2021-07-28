const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')

const middleware = require('./utils/middleware.js')
const blogServer = require('./controllers/blog.js')
dotenv.config()

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogServer)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app