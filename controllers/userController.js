const { User } = require('../models/index')

class UserController {

  static async register(req, res, next) {
    try {
      let { username, email, password, homeNumber, image } = req.body
      let user = await User.create({ username, email, password, homeNumber, image })
      res.status(201).json({ user })
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController;