const Blog= require('../models/blog.js')
const blogRouter = require('express').Router()
const User = require('../models/user.js')
const config = require('../utils/config.js')
const jwt = require('jsonwebtoken')
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
blogRouter.get('/', async(request, response) => {
    const data = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.status(200).json(data)
})


blogRouter.post('/', async(request, response) => {
    
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, config.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: request.body.title,
        url: request.body.url,
        author: request.body.author,
        likes: request.body.likes,
        user: user._id
    })
    if(request.body.likes === undefined)
    {
        blog.likes = 0
    }
    if(request.body.title === undefined || request.body.url === undefined)
    {
        response.status(400).end()
    }
    else
    {
        const savedData = await blog.save()
        
        user.blogs = user.blogs.concat(savedData._id)
        await user.save()
        response.status(201).json(savedData)

    }

})
blogRouter.delete('/:id', async(request, response) => {
    const ID = request.params.id
    const res = await Blog.findByIdAndDelete(ID)
    if(res)
    {
        response.status(204).end()
    }
    else
    {
        response.status(404).send('Missing id')
    }

})
blogRouter.put('/:id', async(request, response) => {
    const ID = request.params.id
    console.log(ID)
    const data = {
        author: request.body.author,
        url: request.body.url,
        title: request.body.title,
        likes: request.body.likes + 1
    }
    console.log(data)
    await Blog.findByIdAndUpdate(ID,data,{ new : true },(err,res) => {
        if(err)
        {
            response.status(500).send('Internal server error')
        }
        else
        {
            console.log(res)
            response.status(204).json(res)
        }

    })
})
module.exports = blogRouter