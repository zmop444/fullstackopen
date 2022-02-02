const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
    console.log('Invalid arguments. To see all entries, run:')
    console.log('  node mongo.js <password>')
    console.log('Or to add a new contact, run:')
    console.log('  node mongo.js <password> <name> <number>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://zmop:${password}@cluster0.91aoh.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person
        .find({})
        .then(persons => {
            persons.forEach(person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
}

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const newPerson = new Person({ name, number })
    newPerson
        .save()
        .then(result => {
            console.log(`Added ${result.name} number ${result.number} to phonebook`)
            mongoose.connection.close()
        })
}