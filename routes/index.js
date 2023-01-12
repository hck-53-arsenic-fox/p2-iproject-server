const express = require("express");
const admin = require("./adminRoute");
const customer = require("./customerRoute");
const router = express.Router();

router.use("/customer", customer);

router.use("/admin", admin);

module.exports = router;
