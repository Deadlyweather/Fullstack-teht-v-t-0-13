var express = require('express')
var cors = require('cors')
var app = express()
const baseUrl = 'http://localhost:3001/api/persons'

const create = () => {
  ""
}
const update = () => {
  ""
}

app.use(cors())

app.get("/", (request, response) => {
  response.json({data1: 'Ello'})
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

export default { getAll, create, update }