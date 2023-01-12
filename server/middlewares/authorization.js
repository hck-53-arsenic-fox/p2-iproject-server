const { User, Transaction } = require("../models/index");

async function authorization(req, res, next) {
  try {
    let id = req.params.id;
    let transaction = await Transaction.findByPk(id);

    if (!transaction) {
      throw { name: "NotFound" };
    }

    let transUser = transaction.UserId;
    let userId = req.user.id;

    if (transUser !== userId) {
      throw { name: "Forbidden" };
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authorization };
