const express = require('express')
const app = express()

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
