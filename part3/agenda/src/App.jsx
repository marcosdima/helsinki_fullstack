import { useState, useEffect } from 'react'
import Agenda from './components/Agenda'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotificationMessage] = useState(null)
  const [errorFlag, setErrorFlag] = useState(false)

  // Time in miliseconds...
  const notificationTime = 5000

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }
  )}
  , [])

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') return

    const newPerson = { name: newName, number: newNumber }

    // Check if the name already exists and ask if you want to update the number...
    const personExists = persons.find(person => person.name === newName)
    if (personExists) {
      const message = `${personExists.name} is already added to phonebook, replace the old number with a new one?`
      if (newNumber !== personExists.number && window.confirm(message)) {
        personService
          .update(personExists.id, newPerson)
          .then(personUpdated => {
            setPersons(persons.map(person => person.id !== personExists.id ? person : personUpdated))
            setNewName("")
            setNewNumber('')
            handleNotificationMessage(
              `Modified ${personExists.name} number: ${personExists.number} to ${newNumber}`
            )
          })
      }
      return
    }

    personService
      .create(newPerson)
      .then(
        personAdded => {
          setPersons(persons.concat(personAdded))
          setNewName("")
          setNewNumber('')
          handleNotificationMessage(`Added ${personAdded.name}`)
      })
  }

  const deletePerson = id => {
    const [person] = persons.filter(person => person.id === id)
    const message = `Are you sure you want to delete ${person.name}?`

    if (!window.confirm(message)) return

    personService
      .remove(id)
      .then(() => {
        console.log(`${person.name} was deleted succesfully...`)
        setPersons(persons.filter(person => person.id !== id))
        handleNotificationMessage(`Deleted ${person.name}`)
      })
      .catch(() => {
        handleNotificationMessage(
          `${person.name} has already been removed from server`,
          true
        )
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  const handleNewName = (event) => { setNewName(event.target.value) }
  const handleNewNumber = (event) => { setNewNumber(event.target.value) }
  const handleFilter = (event) => { 
    console.log(`Filtering by: ${event.target.value}`)
    setFilter(event.target.value)
  }
  const handleNotificationMessage = (message, isAnError) => {
    if (isAnError) setErrorFlag(true)
    else setErrorFlag(false)

    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(null), notificationTime)
  }

  const inputs = [
    {
      text: "name",
      value: newName,
      handler: handleNewName
    },
    {
      text: "number",
      value: newNumber,
      handler: handleNewNumber
    }
  ]

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isAnError={errorFlag} />
      <Input text={"filter shown with"} value={filter} handler={handleFilter} />
      <h2>add a new</h2>
      <PersonForm submitFunction={addPerson} inputs={inputs}/>
      <Agenda persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App