const express = require('express')
const Controller = require('./Controllers/controller')
const app = express()
const port = 6500
const cors = require('cors')
const router = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})