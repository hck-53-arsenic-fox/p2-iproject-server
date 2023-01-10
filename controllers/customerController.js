const { Product, Category } = require("../models/index");
class CustomerController {
    static async getProducts(req, res, next) {
        try {
            let data = await Product.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CustomerController;
