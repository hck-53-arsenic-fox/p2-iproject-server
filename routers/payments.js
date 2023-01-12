const express = require('express')
const router = express.Router()
const controller = require('../controllers/payments')
const { authentication } = require('../middleware/authentication')


router.post('/get-token-payment/:transactionId', authentication ,controller.getPaymment)






module.exports = router