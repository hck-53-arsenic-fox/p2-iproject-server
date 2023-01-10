const express = require("express");
const CustomerController = require("../controllers/customerController");
const customer = express.Router();

customer.get("/", CustomerController.getProducts);
customer.get("/categories", CustomerController.getCategories);
customer.get("/categories/:id", CustomerController.getProductsCategories);
customer.post("/register", CustomerController.register);
customer.post("/login", CustomerController.login);
customer.post("/buy/:id", CustomerController.buyProduct);

module.exports = customer;
