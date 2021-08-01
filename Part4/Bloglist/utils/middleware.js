const logger = require('./logger.js')

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
    unknownEndpoint: unknownEndpoint
}
module.exports = object