const jwt = require('jsonwebtoken')
const logger = require('./logger.js')
const config = require('./config.js')
const User = require('../models/user.js')
const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization')

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        //Any information can be sent with this technique
        request['token'] = authorization.substring(7)

    }
    next()
}
const userExtractor = async(request, response, next) => {

    if(request.token)
    {
        const token = request.token
        const decodedToken = jwt.verify(token, config.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'user does not exist' })
        }
        else
        {

            const data = await User.findOne({ username: decodedToken.username })

            request['user'] = data
        }

    }


    next()
}
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if(error.name === 'ValidationError'){
        return response.status(400).send({ error: 'username must be atleast 3 characters long' })
    }else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    }
    next(error)
}
const object = {
    requestLogger: requestLogger,
    errorHandler: errorHandler,
    unknownEndpoint: unknownEndpoint,
    tokenExtractor: tokenExtractor,
    userExtractor: userExtractor
}
module.exports = object