const { Food } = require("../models");

async function authorizationPut(req, res, next) {
  try {
    const { id } = req.params;
    const foundFood = await Food.findByPk(id);
    if (!foundFood) {
      throw { name: "NotFound" };
    } else if (
      foundFood.authorId === req.user.id ||
      req.user.role === "admin"
    ) {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (err) {
    next(err);
  }
}

async function authorizationPatch(req, res, next) {
  try {
    const { id } = req.params;
    const foundFood = await Food.findByPk(id);
    if (!foundFood) {
      throw { name: "NotFound" };
    } else if (req.user.role === "admin") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { authorizationPut, authorizationPatch };
