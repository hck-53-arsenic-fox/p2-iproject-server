const { User } = require("../models");
const { admin } = require("../auth/auth.firebase");

class UserController {
  static async firebaseLogin(req, res, next) {
    try {
      const { idToken } = req.body;
      const verify = await admin.auth().verifyIdToken(idToken);

      console.log(verify.email);

      const findUser = await User.findOne({where: {email: verify.email}})

      if (!findUser) {
        throw {name: "INVALID_LOGIN"}
      }

      req.user = {
        email: verify.email,
      };

      res.status(200).json({ access_token: idToken });
    } catch (err) {
      next(err);
    }
  }
  static async firebaseRegister(req, res, next) {
    try {
      const { email, address } = req.body;

      const newUser = await User.create({
        email,
        password: "firebase-register",
      });

      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
