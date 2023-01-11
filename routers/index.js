const express = require("express")
const router = express.Router()


const UserController = require("../controllers/userController")
router.post("/users/register", UserController.register)
router.post("/users/login", UserController.login)

module.exports = router