const express = require('express')
const cors = require('cors')

const app = express()
let morgan = require('morgan')

morgan.token('res-content', function (req, res) { return JSON.stringify(req.body) })
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-content'))


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
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const data = request.body

  if (!data.name) return response.status(400).json({ error: 'name missing' })
  else if (!data.number) return response.status(400).json({ error: 'number missing' })

  const alreadyExists = agenda.find(person => person.name === data.name)

  if (alreadyExists) return response.status(400).json({ error: 'name must be unique' })

  const person = {
    name: data.name,
    number: data?.number ?? '',
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`URL: http://localhost:${PORT}/api/persons`)
})
