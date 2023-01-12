const { verifyToken } = require("../helpers");
const { User } = require("../models");

//authen
async function authen(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }
    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      email: user.email,
      status: user.status,
    };
    next();
  } catch (err) {
    next(err);
  }
}

//authorize
async function author(req, res, next) {
  try {
    if (req.user.status !== "VIP") {
      throw { name: "Forbidden" };
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authen, author };
