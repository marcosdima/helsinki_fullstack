const express = require('express')
const app = express()

app.use(express.json())

let agenda = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

function generateID() {
  return Math.floor(Math.random() * 100000)
}

app.get('/api/persons', (request, response) => {
  response.json(agenda)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const target = agenda.find(person => person.id === id) 
  
  if (!target) 
    return response.status(404).end()

  response.json(target)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  agenda = agenda.filter(person => person.id !== id) 
  console.log(agenda)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const data = request.body

  if (!data.name) return response.status(400).json({ error: 'name missing' })
  else if (!data.phone) return response.status(400).json({ error: 'phone missing' })

  const alreadyExists = agenda.find(person => person.name === data.name)

  if (alreadyExists) return response.status(400).json({ error: 'name must be unique' })

  const person = {
    name: data.name,
    phone: data?.phone ?? '',
    id: generateID()
  }
  agenda = agenda.concat(person)
  response.json(person)
})


app.get('/info', (request, response) => {
  const info = `</p>Phonebook has info for ${agenda.length} people</p>`
  const date = new Date()
  response.send(
    info + date
  )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`URL: http://localhost:${PORT}/api/persons`)
})
