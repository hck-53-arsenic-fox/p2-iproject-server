const BillController = require('../controllers/billController')
const express = require('express')
const route = express.Router()

route.get('/', BillController)
route.post('/', BillController)

module.exports = route;