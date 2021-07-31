const Blog= require('../models/blog.js')
const blogServer = require('express').Router()
const User = require('../models/user.js')
blogServer.get('/', async(request, response) => {
    const data = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.status(200).json(data)
})


blogServer.post('/', async(request, response) => {

    const user = await User.findById(request.body.userId)

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
        console.log('Here ', savedData)
        user.blogs = user.blogs.concat(savedData._id)
        await user.save()
        response.status(201).json(savedData)

    }

})
blogServer.delete('/:id', async(request, response) => {
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
blogServer.put('/:id', async(request, response) => {
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
module.exports = blogServer