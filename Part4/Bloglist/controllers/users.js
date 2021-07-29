const userServer = require('express').Router()
const User = require('../models/user.js')
const bcrypt = require('bcrypt')
userServer.post('/', async(request, response) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
    const user = new User({
        name: request.body.name,
        username: request.body.username,
        password: passwordHash
    })
    const savedData = await user.save()
    
    response.status(201).json(savedData)
    
})
userServer.get('/', async(request, response) => {
    const returnedData = await User.find({})
    const resultToShowPublic = []
    for(let info of returnedData){
        const trim = {
            username: info.username,
            name: info.name,
            id: info.id
        }
        resultToShowPublic.push(trim)
    }
    response.status(200).json(resultToShowPublic)
})
module.exports = userServer