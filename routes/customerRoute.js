const express = require("express");
const CustomerController = require("../controllers/customerController");
const { authentication } = require("../middlewares/auth");
const customer = express.Router();

customer.get("/", CustomerController.getProducts);
customer.get("/categories", CustomerController.getCategories);
customer.get("/categories/:id", CustomerController.getProductsCategories);
customer.post("/register", CustomerController.register);
customer.post("/login", CustomerController.login);
customer.get("/cost", CustomerController.getCost);
customer.post("/buy/:id", authentication, CustomerController.buyProduct);

module.exports = customer;
