const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");

const UserController = require("../controllers/userController");

router.post("/users/register", UserController.register);
router.post("/users/login", UserController.login)
router.use(authentication)
router.get("/users/username", UserController.userName)
router.get("/users/profile", UserController.profile)
module.exports = router;
