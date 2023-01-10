const express = require("express");
const admin = express.admin();

admin.use(cors());

admin.use(express.json());

admin.use(express.urlencoded({ extended: false }));

module.exports = admin;
