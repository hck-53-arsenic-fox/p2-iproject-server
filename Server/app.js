if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config()
}

const express = require('express')
const app = express()
const router = require('./routes')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
})