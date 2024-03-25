import { useState } from 'react'
import Agenda from './components/Agenda'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '1122334455' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const name = { name: newName, phone: newPhone }

    const nameExists = persons.find(person => person.name === newName)

    if (nameExists) return alert(`Name '${newName}' already exists...`)

    setPersons(persons.concat(name))
    setNewName("")
  }

  const handleNewName = (event) => { setNewName(event.target.value) }
  const handleNewPhone = (event) => { setNewPhone(event.target.value) }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNewName}
          />
        </div>
        <div>
          number: <input 
            value={newPhone} 
            onChange={handleNewPhone}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Agenda persons={persons} />
    </div>
  )
}

export default App