import { useState } from 'react'
import Agenda from './components/Agenda'
import Input from './components/Input'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const name = { name: newName, phone: newPhone, id: persons.length + 1 }

    const nameExists = persons.find(person => person.name === newName)

    if (nameExists) return alert(`Name '${newName}' already exists...`)

    setPersons(persons.concat(name))
    setNewName("")
  }

  const handleNewName = (event) => { setNewName(event.target.value) }
  const handleNewPhone = (event) => { setNewPhone(event.target.value) }
  const handleFilter = (event) => { setFilter(event.target.value) }

  const inputs = [
    {
      text: "name",
      value: newName,
      handler: handleNewName
    },
    {
      text: "number",
      value: newPhone,
      handler: handleNewPhone
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