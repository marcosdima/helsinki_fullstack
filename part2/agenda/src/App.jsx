import { useState, useEffect } from 'react'
import Agenda from './components/Agenda'
import Input from './components/Input'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }

    const nameExists = persons.find(person => person.name === newName)
    if (nameExists) return alert(`Name '${newName}' already exists...`)

    personService
      .create(newPerson)
      .then(
        personAdded => {
          setPersons(persons.concat(personAdded))
          setNewName("")
      })
  }

  const handleNewName = (event) => { setNewName(event.target.value) }
  const handleNewNumber = (event) => { setNewNumber(event.target.value) }
  const handleFilter = (event) => { setFilter(event.target.value) }

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
      <Input text={"filter shown with"} value={filter} handler={handleFilter} />
      <h2>add a new</h2>
      <PersonForm submitFunction={addPerson} inputs={inputs}/>
      <Agenda persons={persons} filter={filter} />
    </div>
  )
}

export default App