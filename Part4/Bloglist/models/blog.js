const mongoose =  require('mongoose')
const config = require('../utils/config.js')
const logger = require('../utils/logger.js')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('Connected')
    })
    .catch((err) => {
        logger.error({ error: err.message })
    })
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Blog', blogSchema)