const logger = require('./logger')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ error: err.message })
        return
    }
    if (err instanceof jwt.JsonWebTokenError) {
        res.status(400).send({ error: 'invalid token' })
        return
    }
    logger.error(err)
    next(err)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    req.token = null
    if (authorization?.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}

// relies on tokenExtractor middleware
const userExtractor = async (req, res, next) => {
    try {
        if (!req.token) {
            res.status(401).send({ error: 'token missing' })
        }
        const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET)
        const user = await User.findById(decodedToken.id)
        req.user = user
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = {
    unknownEndpoint, errorHandler, tokenExtractor, userExtractor
}
