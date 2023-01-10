const express = require('express')
const CartController = require('../controllers/cartController')
const cartRouter = express.Router()


cartRouter.get('/', CartController.getCart)


module.exports = cartRouter