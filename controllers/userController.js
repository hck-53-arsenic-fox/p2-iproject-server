const { User } = require('../models/index')
const { compareHashed } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body

      if (!email) {
        throw { name: 'EmailRequired' }
      }
      if (!password) {
        throw { name: 'PasswordRequired' }
      }

      let user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        throw { name: 'InvalidCredentials' }
      }

      let comparePass = compareHashed(password, user.password)

      if (!comparePass) {
        throw { name: 'InvalidCredentials' }
      }

      let payload = {
        id: user.id
      }

      let access_token = createToken(payload)

      res.status(200).json({ access_token })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}

module.exports = UserController;