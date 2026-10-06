import axios from 'axios'

app.use(express.static('dist'))

const baseUrl = '/api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)
const create = person => axios.post(baseUrl, person).then(response => response.data)
const update = (id, person) =>
	axios.put(`${baseUrl}/${id}`, person).then(response => response.data)
const kill = id => axios.delete(`${baseUrl}/${id}`)
const validate = person => {
  if (person.name.length < 3) {
    throw new Error('Name must be at least 3 characters long. Denied')
  }
  if (person.number.length < 8) {
    throw new Error('Number must be at least 8 characters long. Denied')
  }
  if (!/^\d{2,3}-\d+$/.test(person.number)) {
    throw new Error('Number must look like xx-xxxxxxx or xxx-xxxxxxx. Denied')
  }
  if ((person.number.match(/-/g) || []).length > 1) {
	throw new Error('You may only dash once greedy boy. Denied')
  }

  return person
}
const purge = () => {
	// Kaikki huonot numerot poistetaan tietokannasta. Hieman extraa
	for (let i = 0; i < persons.length; i++) {
		const person = persons[i]
		try {
			validate(person)
		} catch (error) {
			kill(person.id)
				.then(() => {
					setPersons(persons.filter(p => p.id !== person.id))
					setNewMessage(`${person.name} has been purged for having a bad number`)
					setTimeout(() => setNewMessage(''), 5000)
				})
				.catch(error => {
					console.log('error', error)
					setNewMessage(`Failed to murderate ${person.name}: ${error.message}`)
					setTimeout(() => setNewMessage(''), 5000)
				})
		}
	}
}

export default { getAll, create, update, kill, validate, purge }