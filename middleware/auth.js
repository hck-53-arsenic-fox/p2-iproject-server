const { User, Category, Product } = require("../models/index");
const { decodeToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthenticated" };
    }
    let payLoad = decodeToken(access_token);
    let user = await User.findByPk(payLoad.id);
    if (!user) {
      throw { name: "Unauthenticated" };
    }

    req.user = { id: user.id, role: user.role, email: user.email };
    next();
  } catch (error) {
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.params.id);
    if (!product) {
      throw { name: "Product Not Found" };
    } else {
      if (req.user.role == "admin") {
        next();
      } else {
        if (product.authorId == req.user.id) {
          next();
        } else {
          throw { name: "Forbidden" };
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication, authorization };
