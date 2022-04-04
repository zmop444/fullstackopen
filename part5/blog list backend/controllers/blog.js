const blogRoute = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/Blog')

blogRoute.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
    // res.json(blogs.map(blog => blog.toJSON()))
})

// yet to populate user response
blogRoute.post('/', middleware.userExtractor, async (req, res, next) => {
    try {
        let { title, author, url, likes } = req.body
        const user = req.user

        if (!title || !url) {
            res.statusMessage = 'title or url is missing'
            res.status(400).end()
            return
        }
        if (!likes) {
            likes = 0
        }

        const blog = new Blog({
            title,
            author,
            url,
            likes,
            user: user.id
        })

        const savedBlog = await blog.save()
        user.blogs.push(savedBlog.id)
        await user.save()
        res.status(201).json(savedBlog)
    } catch (err) {
        next(err)
    }
})

// yet to populate user response
blogRoute.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const blog = await Blog.findById(id)
        if (blog === null) {
            res.status(404).end()
            return
        }
        res.json(blog)
    } catch (err) {
        next(err)
    }
})

blogRoute.delete('/:id', middleware.userExtractor, async (req, res, next) => {
    const id = req.params.id
    const user = req.user
    try {
        const blog = await Blog.findById(id)

        if (!blog) {
            res.status(204).end()
            return
        }

        if (blog.user.toString() !== user.id) {
            res.send(401).end()
            return
        }

        await Blog.findByIdAndDelete(id)
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

// TODO: yet to use auth
blogRoute.put('/:id', async (req, res, next) => {
    const id = req.params.id
    let { title, author, url, likes } = req.body

    if (!title || !url) {
        res.statusMessage = 'title or url is missing'
        res.status(400).end()
        return
    }
    if (!likes) {
        likes = 0
    }

    const update = { title, author, url, likes }

    try {
        const blog = await Blog.findByIdAndUpdate(id, update, { new: true, runValidators: true })
        res.json(blog)
    } catch (err) {
        next(err)
    }
})

module.exports = blogRoute
