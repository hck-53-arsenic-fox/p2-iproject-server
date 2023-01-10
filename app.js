const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/index')
const errorhandler = require('./middlewares/errorHandler')
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(routes)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(errorhandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})