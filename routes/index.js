const express = require("express");
const admin = require("./adminRoute");
const customer = require("./customerRoute");
const router = express.Router();

router.use(cors());

router.use(express.json());

router.use(express.urlencoded({ extended: false }));

router.use("/customer", customer);

router.use("/admin", admin);

module.exports = router;
