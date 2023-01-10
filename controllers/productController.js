const { User, Product } = require("../models/index");
const { Op } = require("sequelize");

class ProductController {
     static async getProduct(req, res, next) {
          try {
               const { filter, page, search } = req.query;
               let limit = 1;
               let offset = 0;

               const opt = {
                    order: [["createdAt", "DESC"]],
               };

               if (filter !== "" && typeof filter !== "undefined") {
                    const query = filter.split(",").map((item) => ({
                         [Op.eq]: item,
                    }));

                    opt.where = {
                         CategoryId: { [Op.or]: query },
                    };
               }

               if (search) {
                    opt.where = {
                         name: { [Op.iLike]: `%${search}%` },
                    };
               }

               if (page !== "" && typeof page !== "undefined") {
                    offset = page * limit - limit;
                    opt.offset = offset;
               }
               opt.limit = limit;

               let data = await Product.findAndCountAll(opt);
               if (!data) {
                    throw {
                         name: "DataShowProductNotFound",
                    };
               } else {
                    res.status(200).json(data);
               }
          } catch (err) {
               next(err);
          }
     }
}

module.exports = ProductController;
