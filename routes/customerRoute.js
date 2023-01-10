const express = require("express");
const CustomerController = require("../controllers/customerController");
const customer = express.Router();

customer.get("/", CustomerController.getProducts);
customer.get("/categories", CustomerController.getCategories);
customer.get("/categories/:id", CustomerController.getProductsCategories);

module.exports = customer;
