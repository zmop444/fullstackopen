import React, {useEffect, useState} from 'react'
import personService from './services/persons'

const Notification = ({message, type}) => {
  if (message === null || message === undefined) {
    return null
  }

  let style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (type === 'success') {
    style = {
      ...style,
      color: 'green'
    }
  } else if (type === 'warning') {
    style = {
      ...style,
      color: 'yellow'
    }
  } else if (type === 'error') {
    style = {
      ...style,
      color: 'red'
    }
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

const Filter = ({filter, setFilter}) => {
  const handleFilterChange = (event) => setFilter(event.target.value)
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({persons, setPersons, showNotification}) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const onSubmitForm = (event) => {
    const clearFields = () => {
      setName('')
      setNumber('')
    }
    const addNewPerson = () => {
      const newPerson = {name, number}
      personService.create(newPerson).then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      showNotification(`Added ${name}.`, 'success')
      clearFields()
    }
    const updatePerson = () => {
      const unupdatedPerson = persons.find(person => person.name === name)
      const updatedPerson = {...unupdatedPerson, number}
      personService
        .update(updatedPerson)
        .then(returnedPerson =>
          setPersons(persons.map(person =>
            person.id === returnedPerson.id ? returnedPerson : person)))
      showNotification(`Updated ${name}.`, 'warning')
      clearFields()
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
        name: <input onChange={handleNewNameChange} value={name}/>
      </div>
      <div>
        number: <input onChange={handleNewNumberChange} value={number}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, setPersons, showNotification}) => {
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

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const showShortNotification = (message, type) => {
    setNotificationMessage({message, type})
    setTimeout(() => setNotificationMessage(null), 3000)
  }

  useEffect(() => {
    personService.getAll().then(allPersons => setPersons(allPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage?.message} type={notificationMessage?.type}/>
      <Filter filter={filter} setFilter={setFilter}/>
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} showNotification={showShortNotification}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} setPersons={setPersons} showNotification={showShortNotification}/>
    </div>
  )
}

export default App