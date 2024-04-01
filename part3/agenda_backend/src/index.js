require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('../models/person')

const app = express()
let morgan = require('morgan')

morgan.token('res-content', function (req, res) { return JSON.stringify(req.body) })
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-content'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(res => {
    response.json(res)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Person.findById(id).then(person => response.json(person))
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

  // Person.find({name: data.name}).then(res => {
  //   return response.status(400).json({ error: 'name must be unique' })
  // })

  const person = new Person({
    name: data.name,
    number: data.number,
  })

  person.save().then(res => response.json(res))
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
