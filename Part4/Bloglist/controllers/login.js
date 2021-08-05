const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user.js')
const config = require('../utils/config.js')
loginRouter.post('/', async(request, response) => {
    const body = request.body
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.password)
    if(!(user && passwordCorrect))
    {
        //401 ==> Unauthorized
        response.status(401).send({ error:  'invalid username or password' })
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(userForToken, config.SECRET)
    console.log('here ', token)
    response
        .status(200)
        .send({ token, username: user.username, name: user.name })

})
module.exports = loginRouter