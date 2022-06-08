const http = require('http')
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

//  https and ssl cert is necessary. heroku routes via https so this is eh wtv.
const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`server running on port ${config.PORT}`)
})
