const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/User')
const testHelper = require('./test_helper')

const api = supertest(app)

afterAll(() => {
    mongoose.connection.close()
})

describe('user creation', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('valid user is created', async () => {
        const user = testHelper.user
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-type', /application\/json/)
    })

    test('missing username fails with 400', async () => {
        const user = testHelper.user
        const invalidUser = {
            ...user,
            username: ''
        }
        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
    })

    test('2 character password fails with 400', async () => {
        const user = testHelper.user
        const invalidUser = {
            ...user,
            password: '12'
        }
        await api
            .post('/api/users')
            .send(invalidUser)
            .expect(400)
    })

    test('duplicate username fails with 400', async () => {
        const user = testHelper.user
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })
})
