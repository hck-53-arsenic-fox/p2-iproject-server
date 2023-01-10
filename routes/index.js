const express = require('express')
const { auth } = require('../middlewares/auth')
const productRouter = require('./product')
const userRouter = require('./user')
const router = express.Router()


router.use('/users', userRouter)
router.use(auth)
router.use('/products', productRouter)


module.exports = router