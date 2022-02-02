require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const Person = require('./models/Person')

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(persons => {
            res.json(persons)
        })
        .catch(e => next(e))
})

app.get('/info', (req, res, next) => {
    Person.find({})
        .then(persons => {
            res.send(`Phonebook has info for ${persons.length} people <br> ${new Date()}`)
        })
        .catch(e => next(e))

})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person === null) {
                res.status(404).end()
            }
            res.json(person)
        })
        .catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    Person.findByIdAndRemove(id)
        .then(() => {
            res.status(204).end()
        })
})

morgan.token('json', (req) => {
    return JSON.stringify(req.body)
})
const logger = morgan(':method :url :status :res[content-length] - :response-time ms :json')
app.post('/api/persons', logger, (req, res, next) => {
    const name = req.body.name
    const number = req.body.number

    // if (!name || !number) {
    if (name === undefined || name === '' || number === undefined || number === '') {
        res.statusMessage = 'Name or number is missing.'
        res.status(400).end()
        return
    }

    Person.find({ name })
        .then(persons => {
            if (persons.length !== 0) {
                res.statusMessage = 'Name already exists in phonebook.'
                res.status(400).end()
                return
            }
            const newPerson = new Person({ name, number })
            newPerson
                .save()
                .then(result => {
                    res.json(result)
                })
                .catch(e => next(e))
        })
        .catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    const body = req.body
    const updatePersonValues = {
        name: body.name,
        number: body.number,
    }
    Person.findByIdAndUpdate(id, updatePersonValues, { new: true, runValidators: true })
        .then(person => {
            res.json(person)
        })
        .catch (e => next(e))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (e, req, res, next) => {
    console.log(e.message)
    if (e.name === 'CastError') {
        return res.status(400).send({ error: 'malformed id' })
    }
    else if (e.name === 'ValidationError') {
        return res.status(400).send({ error: e.message })
    }
    res.status(500).end()
    next(e)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`running on port ${PORT}`))