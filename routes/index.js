const express = require("express");
const Controller = require("../controller");
const { authen, author } = require("../middlewares");
const router = express.Router();

router.post('/loginGoogle', Controller.loginUserGoogle)


module.exports = router;
