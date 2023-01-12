if(process.env.Node_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const {errorHandler} = require('./Middleware/HandleError')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index') 

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',router)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})