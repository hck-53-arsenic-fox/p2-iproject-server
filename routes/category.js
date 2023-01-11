const express = require('express')
const ProductController = require('../controllers/productController')
const categoryRouter = express.Router()


categoryRouter.get('/', ProductController.getCategory)


module.exports = categoryRouter