const bcrypt = require('bcrypt')
const userRoute = require('express').Router()
const User = require('../models/User')

userRoute.get('/', async (req, res, next) => {
    try {
        const users = await User.find({}).populate('blogs')
        // const users = await User.find({}).populate('blogs', {title:1, etc})
        res.json(users)
    } catch (err) {
        next(err)
    }
})

userRoute.post('/', async (req, res, next) => {
    const { username, password, name } = req.body

    if (!username || !password || !name) {
        res.status(400).send({ error: 'username, password, or name is missing' })
        return
    }

    try {
        // username as unique field declared in schema, but mongoose does not validate, mongodb then returns error. mongoose-unique-validator? eh nthx
        if (await User.findOne({ username })) {
            res.status(400).send({ error: 'username already exists' })
            return
        }

        if (password.length < 3) {
            res.status(400).send({ error: 'password must at least be 3 characters long' })
            return
        }

        const hash = await bcrypt.hash(password, 10)

        const user = new User({
            username,
            name,
            password: hash
        })

        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch (err) {
        next(err)
    }
})

module.exports = userRoute
