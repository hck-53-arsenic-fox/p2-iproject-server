const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Product, Category, Customer } = require("../models/index");
class CustomerController {
    static async getProducts(req, res, next) {
        try {
            let data = await Product.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async getCategories(req, res, next) {
        try {
            let data = await Category.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async getProductsCategories(req, res, next) {
        try {
            const { id } = req.params;
            let data = await Category.findOne({
                where: { id },
                include: {
                    model: Product,
                },
            });
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async register(req, res, next) {
        try {
            const { name, email, password, phoneNumber, address } = req.body;

            await Customer.create({
                name,
                email,
                password,
                phoneNumber,
                address,
            });
            res.status(201).json({ message: "Berhasil register" });
        } catch (error) {
            console.log(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email) {
                throw { name: "EmailRequired" };
            }
            if (!password) {
                throw { name: "PasswordRequired" };
            }

            let customer = await Customer.findOne({
                where: { email },
            });

            if (!customer) {
                throw { name: "InvalidCredentials" };
            }

            let compared = compareHash(password, customer.password);

            if (!compared) {
                throw { name: "InvalidCredentials" };
            }

            let payload = {
                email: customer.email,
                name: customer.name,
            };

            let access_token = createToken(payload);

            res.status(200).json({
                access_token,
                email: customer.email,
                name: customer.name,
            });
        } catch (error) {
            console.log(error);
        }
    }

    static async getDetailProduct(req, res, next) {
        try {
            const { id } = req.params;

            let data = await Product.findOne({
                where: { id },
                include: {
                    model: Category,
                },
            });
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CustomerController;
