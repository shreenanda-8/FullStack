const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog.js')
const dotenv = require('dotenv')
const logger = require('./utils/logger.js')
const middleware = require('./utils/middleware.js')
dotenv.config()


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})


app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})