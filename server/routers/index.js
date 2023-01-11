const express = require("express");
const router = express.Router();
const customer = require("./customer");
const room = require("./room");
const transaction = require("./transaction");

router.use("/", customer);
router.use("/", room);
router.use("/", transaction);



module.exports = router;