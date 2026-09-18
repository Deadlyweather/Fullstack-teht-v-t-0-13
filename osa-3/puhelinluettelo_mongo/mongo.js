const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

module.exports = mongoose.model('Person', personSchema)

const Person = mongoose.model('Person', personSchema)

if (process.argv[3] != undefined && process.argv[4] != undefined) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  const phonebook = []
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      phonebook.push(`${person.name} ${person.number}`)
    })
    for (let x = 0; x < phonebook.length; x++) {
      console.log(phonebook[x])
    }
    mongoose.connection.close()
  })
}
 

