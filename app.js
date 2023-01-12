if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    }

const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routers/index')
const routes_api = require('./routers/routes-api')

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routes_api)
app.use('/', router)

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});