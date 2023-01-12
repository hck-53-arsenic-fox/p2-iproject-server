const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User, Cart, Movie } = require('../models')
const sendEmail = require('../helpers/nodemailer')
const axios = require("axios");

class UserController {
  static async register(req, res, next) {
    try {
        console.log('masuk controller user');
      let { username, email, password, phoneNumber, address, status } = req.body;
      let user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
        status
      });
      sendEmail(email)
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            throw { name: "EmailOrPasswordRequired" }
        }
        let user = await User.findOne({ where: { email } })
        if (!user) {
            throw { name: "InvalidCredentials" }
        }
        let compare = comparePassword(password, user.password)
        if (!compare) {
            throw { name: "InvalidCredentials" }
        }
        let payload = { id: user.id }
        let access_token = createToken(payload)
        res.status(200).json({ access_token, email: user.email})
    } catch (error) {
        next(error)
    }
}

static async findUser(req, res, next){
  try {
    let id = req.user.id
    let data = await User.findByPk(id, {
      attributes: {
        exclude: ["password","phoneNumber","address","createdAt", "updatedAt"],
      }
    })
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
}

static async quotes(req, res, next){
  try {
    const options = {
      method: 'POST',
      url: 'https://motivational-quotes1.p.rapidapi.com/motivation',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPID_API,
        'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com'
      },
      data: '{"key1":"value","key2":"value"}'
    };
    const {data} = await axios(options)
    res.status(200).json(data.split(`"`)[1])
  } catch (error) {
   next(error) 
  }
}





}

module.exports = UserController;
