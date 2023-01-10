const express = require("express");
const { UserController } = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/", UserController.registerUser);
router.get("/", authentication, UserController.getAllUsers);
router.post("/login", UserController.loginUser);

module.exports = router;
