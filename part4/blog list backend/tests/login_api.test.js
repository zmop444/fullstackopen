const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/User')
const testHelper = require('./test_helper')

const api = supertest(app)

// NOTE: relies on functioning user api.

const userForCreation = testHelper.user

const user = {
    username: userForCreation.username,
    password: userForCreation.password
}

beforeEach(async () => {
    await User.deleteMany({})
    await api
        .post('/api/users')
        .send(userForCreation)
        .expect(201)
        .expect('Content-type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})

describe('user login', () => {
    test('login with valid credentials succeeds with 200 and token', async () => {
        const result = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-type', /application\/json/)
        expect(result.body.token).toBeDefined()
    })

    test('login with invalid credentials fails with 401 and no token', async () => {
        const invalidUser = {
            ...user,
            password: `INVALID${user.password}`
        }

        const result = await api
            .post('/api/login')
            .send(invalidUser)
            .expect(401)

        expect(result.body.token).toBeUndefined()
    })
})
