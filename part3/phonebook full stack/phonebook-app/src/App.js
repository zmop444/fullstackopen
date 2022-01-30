import { useEffect, useState } from "react"
import personService from "./services/persons"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    personService.getAll().then(allPersons => setPersons(allPersons))
  }, [])

  const showShortNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} showNotification={showShortNotification} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} setPersons={setPersons} showNotification={showShortNotification} />
    </div>
  )
}

export default App