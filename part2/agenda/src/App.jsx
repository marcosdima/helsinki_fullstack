import { useState } from 'react'
import Agenda from './components/Agenda'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const name = { name: newName }

    const nameExists = persons.find(person => person.name === newName)

    if (nameExists) return alert(`Name '${newName}' already exists...`)

    setPersons(persons.concat(name))
    setNewName("")
  }

  const handleNewName = (event) => { setNewName(event.target.value) }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNewName}
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