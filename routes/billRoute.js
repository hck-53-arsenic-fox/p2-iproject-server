const BillController = require('../controllers/billController')
const authentication = require('../middlewares/authentication')
const express = require('express')
const route = express.Router()

route.get('/', BillController)
route.post('/', BillController)
route.post('/generateMidtrans', authentication, BillController.generateMidtransToken)
route.get('/:userId', BillController.getBillUser)
route.patch('/:userId', BillController.payBillUser)


module.exports = route;