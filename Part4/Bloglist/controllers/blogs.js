const Blog= require('../models/blog.js')
const blogServer = require('express').Router()
blogServer.get('/', async(request, response) => {
    const data = await Blog.find({})
    response.status(200).json(data)
})


blogServer.post('/', async(request, response) => {
    const blog = new Blog(request.body)
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