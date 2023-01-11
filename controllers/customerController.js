const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const axios = require("axios");
const { Product, Category, Customer, Order } = require("../models/index");
const rajaongkir = process.env.RAJAONGKIR_API_KEY;
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

    //ini di client
    static async getProvince(req, res, next) {
        try {
            const province = await axios
                .get("https://api.rajaongkir.com/starter/province", {
                    headers: { key: rajaongkir },
                })
                .then((response) => {
                    return response.data.rajaongkir.results;
                })
                .catch((err) => {
                    throw err;
                });
            res.status(200).json({ data: province });
        } catch (error) {
            console.log(error);
        }
    }

    // ini di client
    static async getCity(req, res, next) {
        try {
            const { province } = req.body;
            const city = await axios
                .get("https://api.rajaongkir.com/starter/city", {
                    params: { province },
                    headers: { key: rajaongkir },
                })
                .then((response) => {
                    return response.data.rajaongkir.results;
                })
                .catch((err) => {
                    throw err;
                });
            res.status(200).json({ data: city });
        } catch (error) {
            console.log(error);
        }
    }

    static async getCost(req, res, next) {
        try {
            let { destination, courier = "jne" } = req.body;
            const data = {
                origin: "501",
                destination,
                weight: 1700,
                courier,
            };
            const cost = await axios({
                method: "POST",
                url: "https://api.rajaongkir.com/starter/cost",
                data,
                headers: { key: rajaongkir },
            });
            const result = cost.data;
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        }
    }

    static async buyProduct(req, res, next) {
        try {
            const ProductId = req.params.id;
            const CustomerId = req.user.id;

            const status = "PENDING_FOR_PAYMENT";
            await Order.create({ ProductId, CustomerId, status });
            res.status(201).json({ message: "berhasil melakukan checkout" });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CustomerController;
