const express = require("express");
const CustomerController = require("../controllers/customerController");
const { authentication } = require("../middlewares/auth");
const customer = express.Router();

customer.post("/register", CustomerController.register);
customer.post("/login", CustomerController.login);
customer.get("/", CustomerController.getProducts);
customer.get("/categories", CustomerController.getCategories);
customer.get("/categories/:id", CustomerController.getProductsCategories);
customer.get("/detail/:id", CustomerController.getDetailProduct);
customer.get("/cost", CustomerController.getCost);
customer.get("/province", CustomerController.getProvince);
customer.get("/city/:id", CustomerController.getCity);
customer.post(
    "/generate-midtrans-token",
    authentication,
    CustomerController.generateToken
);
customer.post("/buy/:id", authentication, CustomerController.buyProduct);

module.exports = customer;
