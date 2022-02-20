const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const loginRouter = require('./controllers/login')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const middleware = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('conencted to MongoDB')
    })
    .catch(err => {
        logger.error('error connecting to mongoDB:', err.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor) // consider using express-jwt

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
