const MidtransController = require("../controllers/midtransController");
const router = require("express").Router();


router.patch('/subscription',  MidtransController.subscription)
router.post('/generate-mitrans-token',  MidtransController.mitrans)


module.exports = router