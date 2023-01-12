const { User, Product, Category } = require("../models/index");
const { Op } = require("sequelize");

class ProductController {
     static async getCategory(req,res,next) {
          try {
               const category = await Category.findAll({})
               if (!category) {
                    throw {name: 'Categorynotfound'}
               }
               res.status(200).json(category)
          } catch (err) {
               next(err)
          }
     }

     static async getProduct(req, res, next) {
          try {
               const { filter, page, search } = req.query;
               let limit = 6;
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

     static async getDetailProduct(req, res, next) {
          try {
               const { id } = req.params;

               const product = await Product.findByPk(id);
               if (!product) {
                    throw {
                         name: "DataShowProductNotFound",
                    };
               }

               res.status(200).json({
                    data: product,
               });
          } catch (err) {
               next(err);
          }
     }
}

module.exports = ProductController;
