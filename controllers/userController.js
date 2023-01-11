const { User, Resort } = require('../models/index')
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');




class UserController {
  //? Register
  static async register(req, res, next) {
    try {
      if (!req.body.email) throw { name: "Email is required" }
      if (!req.body.password) throw { name: "Password is required" }
      if (!req.body.username) throw { name: "Username is required" }

      let input = {
        email: req.body.email,
        password: hashPassword(req.body.password),
        username: req.body.username
      }

      let user = await User.create(input)
      res.status(201).json({
        id: user.id,
        email: user.email,
        username: user.username
      })
    } catch (error) {
      next(error)
    }
  }


  //? Login
  static async login(req, res, next) {
    try {
      if (!req.body.email) throw { name: "Email is required" }
      if (!req.body.password) throw { name: "Password is required" }

      let user = await User.findOne({
        where: { email: req.body.email }
      })

      if (!user) throw { name: "Invalid email or password" }

      let isMatch = comparePassword(req.body.password, user.password)

      if (!isMatch) throw { name: "Invalid email or password" }

      let payload = {
        id: user.id,
      }

      let access_token = createToken(payload)

      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }

  static async signInWithGoogle(req, res, next) {
    try {
      const googleAuthToken = req.headers.google_auth_token
      const CLIENT_ID = process.env.CLIENT_ID
      const client = new OAuth2Client(CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: googleAuthToken,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const { email } = ticket.getPayload();
      // If request specified a G Suite domain:
      // const domain = payload['hd'];

      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          username: 'googleUser',
          password: 'rahasia'
        },
        hooks: false
      })


      let payload = {
        id: user.id
      }

      let access_token = createToken(payload)

      res.status(200).json({ access_token })

      verify().catch(console.error);

    } catch (error) {
      next(error)
    }
  }
}




module.exports = UserController