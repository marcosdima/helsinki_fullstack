require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('../models/person')

const app = express()
let morgan = require('morgan')

morgan.token('res-content', function (req) { return JSON.stringify(req.body) })
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :res-content'))

// Add a person to the agenda...
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  // Person.find({name: data.name}).then(res => {
  //   return response.status(400).json({ error: 'name must be unique' })
  // })

  const person = new Person({
    name,
    number,
  })

  person.save()
    .then(res => response.json(res))
    .catch(error => next(error))
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
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// Update...
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  const person = {
    name,
    number,
  }

  Person.findByIdAndUpdate(
    request.params.id,
    person,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// Info...
app.get('/info', (require, response, next) => {
  Person
    .find({}).then(res => {
      const info = `</p>Phonebook has info of ${res.length} people</p>`
      const date = new Date()
      response.send(`${info} ${date}`)
    })
    .catch(error => next(error))
})


// ... penultimate,
const unknownEndpoint = (response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
// ... last one.
const errorHandler = (error, require, response, next) => {
  console.error(error.message)
  console.log(error.name)

  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' })
  else if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message })

  next(error)
}
app.use(errorHandler)


// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`URL: http://localhost:${PORT}/api/persons`)
})
