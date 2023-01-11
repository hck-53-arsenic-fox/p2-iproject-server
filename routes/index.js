const express = require("express");
const Controller = require("../controller");
const { authen, author } = require("../middlewares");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/loginGoogle", Controller.loginUserGoogle);
router.use(authen);
router.patch("/upgrade", Controller.upgradeStatus);
router.post("/midtrans", Controller.midtransToken);

module.exports = router;
