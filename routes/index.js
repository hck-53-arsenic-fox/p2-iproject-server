const UserRoute = require('./userRoute')
const app = require('express')
const route = app.Router()

route.use('/users', UserRoute)

module.exports = route