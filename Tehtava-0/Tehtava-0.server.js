const express = require('express')
const app = express()
const port = 3000

let notes = []

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// node Tehtava-0.server.js