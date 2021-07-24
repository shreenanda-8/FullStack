const dotenv = require('dotenv')
dotenv.config()
const MONGODB_URI='mongodb+srv://coder:simple@cluster0.4s04p.mongodb.net/BLOG?retryWrites=true'
const PORT = 3003
const object = {
    MONGODB_URI,
    PORT
}
module.exports = object