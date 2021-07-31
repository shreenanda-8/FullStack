const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app.js')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user.js')
describe('Validation of new user', () => {
    beforeEach( async() => {

        await User.deleteMany({})

    })
    test('check for invalid username', async() => {
        const passwordHash = await bcrypt.hash('sekret', 10)
        const newUser = {
            name: 'sdhsdsds',
            username: 'se',
            password: passwordHash
        }
        const response = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toContain('username must be atleast 3 characters long')

    })
})
afterAll(() => {
    mongoose.connection.close()
})