import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  console.log('getAll')
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const create = newObject => {
  console.log('create')
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  console.log('update')
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const kill = (id) => {
  console.log('kill')
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  kill: kill
}