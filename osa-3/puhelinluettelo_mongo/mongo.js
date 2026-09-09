const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tonyruotsalainenuusi_db_user:${password}@cluster0.ew0rcgm.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery', false)

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

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
 

