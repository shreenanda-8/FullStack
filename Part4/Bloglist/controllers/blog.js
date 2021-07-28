const Blog= require('../models/blog.js')
const blogServer = require('express').Router()
blogServer.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})


blogServer.post('/', (request, response) => {
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
        blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
    }
   
})
module.exports = blogServer