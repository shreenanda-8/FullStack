const mongoose = require('mongoose')
const config = require('../utils/config.js')
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const uniqueValidator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlenth: 3
    },
    name: String

})
userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})
module.exports = mongoose.model('User', userSchema)