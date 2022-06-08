const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

loginRouter.post('/', async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    let passwordIsCorrect = false

    if (user) {
        passwordIsCorrect = await bcrypt.compare(password, user.password)
    }

    if (!passwordIsCorrect) {
        res.status(401).json({
            error: 'username or password is incorrect'
        })
        return
    }

    const userDataForToken = {
        username,
        id: user.id
    }

    const token = jwt.sign(userDataForToken, process.env.JWT_SECRET)
    res
        .status(200)
        .send({
            token,
            username
        })
})

module.exports = loginRouter
