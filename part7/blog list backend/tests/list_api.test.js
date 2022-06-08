const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/Blog')
const testHelper = require('./test_helper')
const User = require('../models/User')

const api = supertest(app)

// NOTE: relies on functioning user and login api.

let token = null
beforeAll(async () => {
    const userForCreation = testHelper.user
    const userForLogin = {
        username: userForCreation.username,
        password: userForCreation.password
    }
    await User.deleteMany({})
    await api
        .post('/api/users')
        .send(userForCreation)
        .expect(201)
    const loginResult = await api
        .post('/api/login')
        .send(userForLogin)
        .expect(200)
    token = loginResult.body.token
})

beforeEach(async () => {
    await Blog.deleteMany({})
    // const dbBlogPromises = testHelper.blogs.map(blog => new Blog(blog).save())
    // await Promise.all(dbBlogPromises)
    await Blog.insertMany(testHelper.blogs)
})

afterAll(() => {
    mongoose.connection.close()
})

describe('viewing blogs', () => {
    test('get blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(testHelper.blogs.length)
    })

    test('blog identifier of object is property id', async () => {
        const result = await api.get('/api/blogs')
        expect(result.body[0].id).toBeDefined()
    })
})

describe('blog creation', () => {
    test('post new blog with the new blog accessible', async () => {
        // get number of blogs in db
        const getAllBlogs = await api.get('/api/blogs')
        const allBlogsLength = getAllBlogs.body.length
        // create new blog
        const blog = testHelper.blogs[0]
        const postResult = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const idFromCreation = postResult.body.id
        // get number of blogs after creation
        const getAllBlogsAfter = await api.get('/api/blogs')
        expect(getAllBlogsAfter.body).toHaveLength(allBlogsLength + 1)
        const getBlogResult = await api.get(`/api/blogs/${idFromCreation}`)
        expect(getBlogResult.body).toEqual(
            expect.objectContaining(blog)
        )
    }, 5000)

    test('blog with no likes set defaults to zero', async () => {
        const blog = { ...testHelper.blogs[0] }
        delete blog.likes
        const result = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
        expect(result.body).toHaveProperty('likes', 0)
    })

    describe('post with missing data fails with 400', () => {
        test('no author', async () => {
            const blog = { ...testHelper.blogs[0] }
            delete blog.author
            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .expect(400)
        })
        test('no url', async () => {
            const blog = { ...testHelper.blogs[0] }
            delete blog.url
            await api
                .post('/api/blogs')
                .set('Authorization', `bearer ${token}`)
                .expect(400)
        })
    })
})

describe('blog update', () => {
    const blog = testHelper.blogs[0]
    let postResult
    beforeEach(async () => {
        postResult = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-type', /application\/json/)
    })
    test('put with updated data', async () => {
        const idFromCreation = postResult.body.id
        const updatedTitle = `UPDATED: ${blog.title}`
        const updatedBlog = {
            ...blog,
            title: updatedTitle
        }
        const updateResult = await api
            .put(`/api/blogs/${idFromCreation}`)
            .send(updatedBlog)
        expect(updateResult.body.title).toBe(updatedTitle)
    })
    test('put with missing data fails with 400', async () => {
        const idFromCreation = postResult.body.id
        const updatedTitle = ''
        const updatedBlog = {
            ...blog,
            title: updatedTitle
        }
        await api
            .put(`/api/blogs/${idFromCreation}`)
            .send(updatedBlog)
            .expect(400)
    })
})
