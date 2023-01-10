const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const playerRoutes = require('./playerRoutes')

router.use('/users', userRoutes)
// router.use('/players', playerRoutes)

module.exports = router