const express = require('express')
const app = express()
var morgan = require('morgan')



app.use(express.json())
morgan.token('body', function (request) {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
]

let Time = new Date()

app.get('/info', (request, response) => {
    console.log(Time)
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${Time}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id= Number(request.params.id)
    console.log(id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const { name, number } = request.body
    
    console.log(name)
    console.log(number)
    console.log(request.body)
    

    if (!name || !number) {
        console.log("invalid: insufficient details")
        return response.status(404).end()
    }

    if (persons.find(person => person.name === name)) {
        console.log("invalid: no duplicates")
        return response.status(404).end()
    }

    const maxId = Math.max(...persons.map(person => person.id), 1)
    const scale = 2
    const minId = 1

    let id = Math.floor(Math.random() * (maxId * scale)) + minId
    let attempts = 1
    while (persons.find(person => person.id === id)) {
        id = Math.floor(Math.random() * (maxId * scale)) + minId
        attempts +=1
    }
    console.log(attempts)

    const person = { id, name, number }
    persons = persons.concat(person)
    console.log(persons)

    response.status(200).json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`localhost:${PORT}`)
})

