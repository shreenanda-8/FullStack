const dotenv = require('dotenv')
dotenv.config()
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const PORT = 3003
const SECRET = process.env.SECRET
const object = {
    MONGODB_URI,
    PORT,
    SECRET
}

module.exports = object