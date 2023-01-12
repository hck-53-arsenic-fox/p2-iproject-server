const router = require("express").Router();
const routerUser = require("./user");
const errorHandler = require("../middleware/errorHandlers");
const routerMain = require("./main");

router.use(routerUser);
router.use(routerMain);

router.use(errorHandler);

module.exports = router;
