const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI

console.log('connecting to ', uri)
mongoose.connect(uri)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(e => {
        console.log('error connecting to MongoDB:', e.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: v => /(^\d{2,3}-\d{6,})|\d{8,}/.test(v),
            message: props => `${props.value} is not a valid phone number.`
        }
    }
})

personSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    }
})

module.exports = mongoose.model('Person', personSchema)