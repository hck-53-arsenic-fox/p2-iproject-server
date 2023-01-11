const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const { signPayload } = require("../helpers/jwt.js");
const { comparePassword } = require("../helpers/bcrypt.js");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const createdUser = await User.create({
        email,
        password,
      });
      const payload = { id: createdUser.id };
      const access_token = signPayload(payload);
      res.status(201).json({ access_token, email: createdUser.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "MissingEmailInput" };
      }
      if (!password) {
        throw { name: "MissingPasswordInput" };
      }
      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser || !comparePassword(password, foundUser.password)) {
        throw { name: "InvalidCredentials" };
      }
      const payload = { id: foundUser.id };
      const access_token = signPayload(payload);
      res.status(200).json({ access_token, email: foundUser.email });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "google",
        },
        hooks: false,
      });
      const access_token = signPayload({ id: user.id });
      res.status(200).json({ access_token, email: payload.email });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
