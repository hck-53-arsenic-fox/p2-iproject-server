const { User } = require("../models");
const { admin } = require("../auth/auth.firebase");

class UserController {
  static async firebaseLogin(req, res, next) {
    try {
      const { idToken } = req.body;
      const verify = await admin.auth().verifyIdToken(idToken);

      res.status(200).json({ access_token: idToken });
    } catch (err) {
      next(err);
    }
  }

  static async firebaseLoginGoogle(req, res, next) {
    try {
      const { token } = req.body

      const verify = await admin.auth().verifyIdToken(token)

      res.status(200).json({access_token: token})
      
    } catch (err) {
      next(err)
    }
  }
  
}
module.exports = UserController;
