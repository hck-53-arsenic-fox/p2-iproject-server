const express = require('express')
const ProductController = require('../controllers/productController')
const productRouter = express.Router()


productRouter.get('/', ProductController.getProduct )
productRouter.get('/:id', ProductController.getDetailProduct )


module.exports = productRouter