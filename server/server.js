const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors)
const port = 4000

app.post('/', (req, res) => {
  console.log("JESTEM")
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})