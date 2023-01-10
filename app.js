const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routers/index')

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', router)

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});