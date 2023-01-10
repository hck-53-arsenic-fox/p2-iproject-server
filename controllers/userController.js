const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User, Cart, Movie } = require('../models')

class UserController {
  static async register(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address, status } = req.body;
      console.log(req.body, "<<<<<<<<<<<<<<<");
      let user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        status
      });
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async login() {}
  static async googleLogin() {}
}

module.exports = UserController;
