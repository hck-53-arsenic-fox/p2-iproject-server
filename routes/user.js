const express = require('express')
const UserController = require('../controllers/userController')
const userRouter = express.Router()


userRouter.post('/login', UserController.loginGoogle)


module.exports = userRouter