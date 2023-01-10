const router = require('express').Router()
const userRoute = require('./userRoute')
const { authentication } = require('../middleware/auth')



router.use('/users',  userRoute)
// router.use(authentication)




module.exports = router