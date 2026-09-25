const mongoose = require('mongoose')
require('dotenv').config()

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.models.Person || mongoose.model('Person', personSchema)

module.exports = Person

if (require.main === module && process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

if (require.main === module && process.argv[3] != undefined && process.argv[4] != undefined) {

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (require.main === module) {
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
 

