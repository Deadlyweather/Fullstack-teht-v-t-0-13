require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./mongo')

const app = express()
app.use(express.json())

mongoose.set('strictQuery', false)

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => response.json(persons))
    .catch(error => response.status(500).json({ error: error.message }))
})

app.post('/api/persons', (request, response) => {
  const person = new Person(request.body)
  person.save()
    .then(savedPerson => response.status(201).json(savedPerson))
    .catch(error => response.status(400).json({ error: error.message }))
})

app.put('/api/persons/:id', (request, response) => {
  Person.findById(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => response.status(400).json({ error: error.message }))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.status(204).end()
      } else {
        response.status(404).end()
      }
    })
    .catch(error => response.status(400).json({ error: error.message }))
})


const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

