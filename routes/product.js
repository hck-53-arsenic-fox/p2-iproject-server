const express = require('express')
const ProductController = require('../controllers/productController')
const ThirdApiController = require('../controllers/thirdApiController')
const productRouter = express.Router()


productRouter.get('/', ProductController.getProduct )
productRouter.get('/bengal', ThirdApiController.catBengal )
productRouter.get('/:id', ProductController.getDetailProduct )


module.exports = productRouter