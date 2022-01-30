import { useState } from "react"
import personService from "../services/persons"

const PersonForm = ({ persons, setPersons, showNotification }) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const onSubmitForm = (event) => {
        const clearFields = () => {
            setName('')
            setNumber('')
        }
        const addNewPerson = () => {
            const newPerson = { name, number }
            personService
                .create(newPerson)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    showNotification(`Added ${name}.`, 'success')
                    clearFields()
                })
                .catch(e => {
                    console.log(e)
                    showNotification(e.response.data.error, 'error')
                })
        }
        const updatePerson = () => {
            const unupdatedPerson = persons.find(person => person.name === name)
            const updatedPerson = { ...unupdatedPerson, number }
            personService
                .update(updatedPerson)
                .then(returnedPerson => {
                    console.log(returnedPerson, persons)
                    setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
                    showNotification(`Updated ${name}.`, 'warning')
                    clearFields()
                })
                .catch(e => {
                    console.log(e)
                    showNotification(e.response.data.error, 'error')
                })
        }
        const confirmUpdateAction = () => {
            if (window.confirm(`${name} already exists. Update with new number?`)) {
                updatePerson()
            }
        }

        event.preventDefault()
        if (persons.map(person => person.name).includes(name)) {
            confirmUpdateAction()
        } else {
            addNewPerson()
        }
    }

    const handleNewNameChange = (event) => setName(event.target.value)
    const handleNewNumberChange = (event) => setNumber(event.target.value)
    return (
        <form onSubmit={onSubmitForm}>
            <div>
                name: <input onChange={handleNewNameChange} value={name} />
            </div>
            <div>
                number: <input onChange={handleNewNumberChange} value={number} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm