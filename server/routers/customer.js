const express = require("express");
const router = express.Router();
const ControllerCustomer = require("../controllers/controllersCustomer");
const {authetication} = require('../middlewares/authetication')

router.post("/register", ControllerCustomer.register);
router.post("/login", ControllerCustomer.login);
router.post("/googleSignIn", ControllerCustomer.googleSignIn);




module.exports = router;