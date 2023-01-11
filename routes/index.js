const express = require("express");
const authentication = require("../middlewares/authentication");
const UserController = require("../controllers/UserController");
const food = require("./food");
const customer = require("./customer");

const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-login", UserController.googleLogin);

router.use(authentication);

module.exports = router;
