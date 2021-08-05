const Blog= require('../models/blog.js')
const blogRouter = require('express').Router()
const User = require('../models/user.js')
const middleware = require('../utils/middleware.js')

blogRouter.get('/', async(request, response) => {
    const data = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.status(200).json(data)
})


blogRouter.post('/', middleware.userExtractor,async(request, response) => {



    const user = request.user

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
blogRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
    const ID = request.params.id

    const data = request.user

    const updatedBlogs = data.blogs.filter((info) => info.toString() !== ID.toString())
    if(updatedBlogs.length === data.blogs.length)
    {
        return response.status(404).send({ error: 'The blog you are referring to, does not exists' })
    }

    const update = {
        blogs: updatedBlogs
    }
    await User.findOneAndUpdate({ username: data.username }, update, { new: true })

    await Blog.findByIdAndDelete({ _id: ID })

    response.status(204).end()



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