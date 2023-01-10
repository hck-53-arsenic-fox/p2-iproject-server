const express = require("express");
const customer = express.customer();

customer.use(cors());

customer.use(express.json());

customer.use(express.urlencoded({ extended: false }));

module.exports = customer;
