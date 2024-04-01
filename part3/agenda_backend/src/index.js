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

// Add a person to the agenda...
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

// Get all...
app.get('/api/persons', (request, response) => {
  Person.find({}).then(res => {
    response.json(res)
  })
})

// Get by id...
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) response.json(person)
      else response.status(404).end()
    })
    .catch(error => next(error))
})

// Delete...
app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Update...
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.get('/info', (request, response) => {
  const info = `</p>Phonebook has info for ${0} people</p>`
  const date = new Date()
  response.send(
    info + date
  )
})


// ... penultimate,
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
// ... last one.
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') return response.status(400).send({ error: 'malformatted id' })
  
  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`URL: http://localhost:${PORT}/api/persons`)
})
