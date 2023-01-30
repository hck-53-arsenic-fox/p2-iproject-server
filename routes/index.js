const UserRoute = require('./userRoute')
const BillRoute = require('./billRoute')
// const authentication = require('../middlewares/authentication')
const express = require('express')
const route = express.Router()

route.use('/users', UserRoute)
route.use('/bills', BillRoute)
// route.use('/bills', authentication, BillRoute)


module.exports = route