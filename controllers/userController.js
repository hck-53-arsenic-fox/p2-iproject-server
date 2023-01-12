const { User } = require('../models/index')
const { compareHashed } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Op } = require("sequelize");
class UserController {

  static async register(req, res, next) {
    // console.log(req.file, '<<<<<');
    try {
      const imgDefault = req.file.path
      // let { username, email, password, homeNumber, image } = req.body
      let { username, email, password, homeNumber } = req.body
      let user = await User.create({ username, email, password, homeNumber, image: imgDefault })
      res.status(201).json({ user })
    } catch (error) {
      console.log(error);
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
      let username = user.username
      let emailUser = user.email
      let access_token = createToken(payload)

      res.status(200).json({ access_token, username, id: payload.id, emailUser })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      let users = await User.findAll({
        attributes: {
          exclude: 'password'
        }
      })
      res.status(200).json(users)
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async search(req, res, next) {
    try {
      let { name } = req.query
      console.log(name);
      let findedUser = await User.findAll({
        where: {
          username: {
            [Op.iLike]: `%${name}%`
          }
        }
      })
      console.log(findedUser);
      res.status(200).json(findedUser)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

}

module.exports = UserController;