import { useState, useEffect } from 'react'
import peopleService from './Persons.js'


const Filter = (props) => {
  return (
    <div>
      filter shown with <input
        type="text"
        value={props.filterBy}
        onChange={props.handleFilterChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  const { addName, newName, newNumber, handleNameChange, handleNumberChange } = props
  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input
          type="text"
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: 
        <input
          type="text"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    <div className="big">
      {props.persons.map(person => 
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.deleteName(person.id)}>Kill</button>
        </p>
      )}
    </div>
  )
}



const Notification = (props) => {
  if (props.newMessage === '') {
    return null
  }

  const isDeleteMessage = props.newMessage.includes('murderated') || props.newMessage.includes('killed')
  
  const notificationStyle = {
    color: isDeleteMessage ? 'red' : 'lime',
    backgroundColor: isDeleteMessage ? '#ffe0e0' : '#e0ffe0',
    border: `2px solid ${isDeleteMessage ? 'red' : 'lime'}`,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div className="notification" style={notificationStyle}>
      {props.newMessage}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic'
  }

  return (
    <div style={footerStyle}>
      <br />
      <p>
        PhoneBook app, Department of Computer Science, University of Helsinki 2025
      </p>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    console.log('effect')
    peopleService
      .getAll()
      .then(initialData => {
        console.log('promise fulfilled')
        setPersons(initialData)
      })
  }, [])

  const updateName = id => {
    const person = persons.find(p => p.id === id)
    const newObject = { ...person, number: newNumber }

    peopleService
      .update(id, newObject)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response))
        setNewName('')
        setNewNumber('')
        setNewMessage(`${person.name}'s number has been changed`)
        setTimeout(() => setNewMessage(''), 5000)
      })
      // if nonexistant
      .catch(error => {
        console.log('error', error)
        setNewMessage(`Information of ${person.name} is invalid and has been killed from the server`)
        setTimeout(() => setNewMessage(''), 5000)
        setPersons(persons.filter(p => p.id !== id))
      })

      
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.some(person => person.name === newName)) {
      alert(`${newName}'s name is already in the phonebook, updating number`)
      const person = persons.find(p => p.name === newName)
      updateName(person.id)
      return
    }

    peopleService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNewMessage(`Added ${newName}`)
        setTimeout(() => setNewMessage(''), 5000)
    })
    .catch(error => {
      console.log('error', error)
      setNewMessage(`Failed to add ${newName}`)
      setTimeout(() => setNewMessage(''), 5000)
    })
    
  }

  const deleteName = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Kill ${person.name}?`)) {
      peopleService
        .kill(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
          setNewMessage(`${person.name} has been murderated`)
          setTimeout(() => setNewMessage(''), 5000)
        })
        .catch(error => {
          console.log('error', error)
          setPersons(persons.filter(person => person.id !== id))
          setNewMessage(`${person.name} has already been murderated and is now updated`)
        })
    }
  }

  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const [filterBy, setFilterBy] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterBy(event.target.value)
  }
  
  const personsFiltered = filterBy === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()))

    return (
    <div>
      <h1>Phonebook</h1>

      <Notification newMessage={newMessage} />

      <Filter
        filterBy={filterBy}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons persons={personsFiltered} deleteName={deleteName} />

      <Footer />
    </div>
  )

}


export default App