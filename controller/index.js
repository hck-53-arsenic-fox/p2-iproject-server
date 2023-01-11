const { createToken, comparePassword } = require("../helpers");
const { User } = require("../models");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async loginUserGoogle(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const googlePayload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: googlePayload.email,
        },
        defaults: {
          email: googlePayload.email,
          password: "rahasiasekali",
          status: "Regular",
        },
        hooks: false,
      });

      let payload = { id: user.id };
      const access_token = createToken(payload);

      res
        .status(200)
        .json({ access_token, status: user.status, email: user.email });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Controller;
