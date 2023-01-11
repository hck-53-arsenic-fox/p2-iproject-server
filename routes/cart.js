const express = require('express')
const CartController = require('../controllers/cartController')
const cartRouter = express.Router()


cartRouter.get('/', CartController.getCart)
cartRouter.get('/:id', CartController.nodeMailer)
cartRouter.post('/:ProductId', CartController.postCart)
cartRouter.delete('/:id', CartController.deleteCart)

module.exports = cartRouter