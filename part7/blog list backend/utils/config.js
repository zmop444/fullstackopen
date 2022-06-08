require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

// own preference (more safe?). note NODE_ENV= production, development, test. dev!=test. but most likely prod details are not anywhere near dev anyway
// const MONGODB_URI = process.env.NODE_ENV === 'production'
// ? process.env.MONGODB_URI
// : process.env.TEST_MONGODB_URI

const ON_TESTING_MODE = process.env.NODE_ENV === 'test'

module.exports = {
    PORT, MONGODB_URI, ON_TESTING_MODE
}
