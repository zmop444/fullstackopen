import personService from "../services/persons"

const Persons = ({ persons, setPersons, showNotification }) => {
    const confirmDeleteAction = (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            deletePerson(id)
        }
    }
    const deletePerson = (id) => {
        const removeLocally = () => setPersons(persons.filter(person => person.id !== id))
        personService
            .deleteId(id)
            .then(response => {
                removeLocally()
            })
            .catch(error => {
                const name = persons.find(person => person.id === id).name
                showNotification(`Error: ${name} has already been removed from the server.`, 'error')
                removeLocally()
            })
    }

    return (
        <div>
            {persons.map(person => (
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => confirmDeleteAction(person.id, person.name)}>delete</button>
                </p>
            ))}
        </div>
    )
}
export default Persons