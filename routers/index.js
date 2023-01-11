const express = require('express')
const router = express.Router()
const controllerUser = require('./users')
const controllerDoctor = require('./doctors')
const controllerTransaction = require('./transactions')
const controllerPayment = require('./payments')

router.use('/users', controllerUser)
router.use('/doctors', controllerDoctor)
router.use('/transactions', controllerTransaction)
router.use('/payments', controllerPayment)





module.exports = router