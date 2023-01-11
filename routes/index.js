const express = require('express')
const { auth } = require('../middlewares/auth')
const cartRouter = require('./cart')
const categoryRouter = require('./category')
const productRouter = require('./product')
const userRouter = require('./user')
const wishlistRouter = require('./wishlist')
const router = express.Router()


router.use('/users', userRouter)
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use(auth)
router.use('/wishlist', wishlistRouter)
router.use('/cart', cartRouter)


module.exports = router