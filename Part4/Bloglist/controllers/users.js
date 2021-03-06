const userRouter = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
userRouter.post('/', async(request, response) => {
    const saltRounds = 10

    //Validation of password should be done in collections it's hashed in db
    if(request.body.password.length<3)
    {
        response.status(400).send({ error: 'Password must be atleast 3 characters long' })
    }
    else
    {
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
        const user = new User({
            name: request.body.name,
            username: request.body.username,
            password: passwordHash
        })
        const savedData = await user.save()

        response.status(201).json(savedData)
    }


})
userRouter.get('/', async(request, response) => {
    const returnedData = await User.find({}).populate('blogs',  { username: 1, author: 1, id: 1, title: 1, url: 1 })

    response.status(200).json(returnedData)
})
module.exports = userRouter