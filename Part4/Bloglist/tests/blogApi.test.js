const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const Blog = require('../models/blog.js')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    }
]

beforeEach(async() => {
    await Blog.deleteMany({})
    console.log('Started')
    for(let info of initialBlogs){
        const data = new Blog(info)
        data.save()
        console.log('saved')
    }
    console.log('Complete')
})
test('verify GET request to /api/blogs', async() => {
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

test('verify the proper key nomenclature in database', async() => {
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    for(let info of response.body) {
        expect(info.id).toBeDefined()
    }

})
test('verify POST request to /api/blogs', async() => {
    const newBlog = {
        title:  'Fullstackopen is great',
        author: 'Edsger W. Floyd',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 4
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const currentBlogs = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    console.log(currentBlogs.body)
    expect(currentBlogs.body.length).toBe(initialBlogs.length + 1)
})
test('handling missing properties (likes)', async() => {
    const newBlog = {
        title:  'Fullstackopen is great',
        author: 'Edsger W. Floyd',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',

    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    for(let info of response.body)
    {
        expect(info.likes).toBeDefined()
    }
})
test('verify the missing properites (title, url)', async() => {
    const newBlog = {
        author: 'Edsger W. Floyd',
        likes: 100
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})