const { User } = require("../models/index");
const { hash, compare } = require("../helpers/bcrypt");
const { OAuth2Client } = require("google-auth-library");
const { createToken } = require("../helpers/jwt");
const { kirimEmail } = require("../helpers/email");

class ControllerUser {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "ErrorValidation" };
      }
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "ErrorCredentials", msg: "Invalid email or password" };
      }
      const checkPass = compare(password, user.password);
      if (checkPass) {
        let token = createToken({ id: user.id });
        res.status(200).json({
          access_token: token,
          email: user.email,
          id: user.id,
        });
      } else {
        throw { name: "ErrorCredentials" };
      }
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body;
      let user = await User.create({
        username,
        email,
        password,
      });
      const templateEmail = {
        from: "fazafirnanda@gmail.com",
        to: email,
        subject: "Invoice Useum",
        html: `<h1>Haii,</h1>${username}</p> <p>Welcome to the Club !</p>`,
      };
      kirimEmail(templateEmail);
      res.status(201).json({ message: `${user.id}, ${user.email}` });
    } catch (error) {
      next(error);
    }
  }
  static async signInWithGoogle(req, res, next) {
    try {
      const googleAuthToken = req.headers.google_token;
      const CLIENT_ID = process.env.CLIENT_ID;
      const client = new OAuth2Client(CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: googleAuthToken,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      let [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.given_name,
          email: payload.email,
          password: "verysecret",
        },
        hooks: false,
      });
      let token = createToken({ id: user.id });
      res.status(200).json({
        access_token: token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerUser;
