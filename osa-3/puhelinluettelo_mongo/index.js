require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Person = require('./mongo')

const app = express()
app.use(express.json())

mongoose.set('strictQuery', false)

const Carrier = {
  getAll: () => app.get('/api/persons', (request, response) => {
    Person.find({})
      .then(persons => response.json(persons))
      .catch(error => response.status(500).json({ error: error.message }))
  }),
  create: () => app.post('/api/persons', (request, response) => {
    const person = new Person(request.body)
    person.save()
      .then(savedPerson => response.json(savedPerson))
      .catch(error => response.status(400).json({ error: error.message }))
  }),
  update: () => app.put('/api/persons/:id', (request, response) => {
    Person.findByIdAndUpdate(
      request.params.id,
      request.body,
      
    )
      .then(updatedPerson => {
        if (updatedPerson) {
          response.json(updatedPerson)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => response.status(400).json({ error: error.message }))
  }),
  kill: () => app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
      .then(deletedPerson => {
        if (deletedPerson) response.status(204).end()
        else response.status(404).end()
      })
      .catch(error => response.status(400).json({ error: error.message }))
  })
}

Object.values(Carrier).forEach(registerRoute => registerRoute())

const url = process.env.MONGODB_URI

const PORT = process.env.PORT || 3001

if (!url) {
  console.error('MONGODB_URI is missing')
  process.exit(1)
}

console.log('connecting to MongoDB')
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
    process.exit(1)
  })