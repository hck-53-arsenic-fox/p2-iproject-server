const express = require("express");
const Controller = require("../controller");
const { authen, author } = require("../middlewares");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/loginGoogle", Controller.loginUserGoogle);
router.get("/newsTechnology", Controller.newsTechnology);
router.get("/newsPolitics", Controller.newsPolitics);
router.get("/newsBusiness", Controller.newsBusiness);
router.get("/newsSports", Controller.newsSports);
router.use(authen);
router.patch("/upgrade", Controller.upgradeStatus);
router.post("/midtrans", Controller.midtransToken);
router.get("/newsTechnology/:id", author, Controller.newsTechnologyById);
router.get("/newsPolitics/:id", author, Controller.newsPoliticsById);
router.get("/newsBusiness/:id", author, Controller.newsBusinessById);
router.get("/newsSports/:id", author, Controller.newsSportsById);

module.exports = router;
