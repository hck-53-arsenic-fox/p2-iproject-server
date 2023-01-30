const BillController = require('../controllers/billController')
const authentication = require('../middlewares/authentication')
const express = require('express')
const route = express.Router()

route.get('/', authentication, BillController.getBillUser)
route.post('/generateMidtrans/:id', authentication, BillController.generateMidtransToken)
route.patch('/:id', BillController.payBillUser)


module.exports = route;