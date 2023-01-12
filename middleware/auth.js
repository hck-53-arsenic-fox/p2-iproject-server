const { verifyToken } = require("../helpers/jwt");
const { User, Cart, movie } = require("../models");

async function authentication(req, res, next) {
  try {

    let access_token = req.headers.access_token;

    if (!access_token) {
      throw { name: "Unaunthenticated" };
    }
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unaunthenticated" };
    }
    req.user = { id: user.id,  user: user.username };
    next();
  } catch (error) {
 
    next(error);
  }
}

module.exports = {authentication}