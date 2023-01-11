const { User } = require("../models");


class UserController {
  // ******* Register Open ********* //
  static async register(req, res) {
    const { username, email, password, profilePicture } = req.body;
    try {
      let data = await User.create({
        username,
        email,
        password,
        profilePicture,
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error, "<<< dari user");
      if (error.name === "SequelizeUniqueConstraintError") {
        error = error.errors.map((el) => el.message);
        res.status(400).json({ error });
      } else if (error.name === "SequelizeValidationError") {
        error = error.errors.map((el) => el.message);
      } else if (error.errors) {
        error = error.errors[0].name;
      }
      res.status(400).json({ error });
    }
  }
  // ******* Register Closed ********* //

  // ******* Login Open ********* //
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) throw { status: 401, message: "Email is required" };
      if (!password) throw { status: 401, message: "Password is required" };
      let user = await User.findOne({ where: { email: email } });
      if (!user) throw { status: 400, message: "Invalid email/password" };
      let compared = comparehash(password, user.password);
      if (!compared) throw { status: 400, message: "Invalid email/password" };
      let payload = { id: user.id };
      let access_token = createToken(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      if (error.message === "Email is required") {
        error = error.message;
      } else if (error.message === "Password is required") {
        error = error.message;
      } else if (error.message === "Invalid email/password") {
        error = "Invalid email/password";
      }
      res.status(400).json({ error });
      // next(error)
    }
  }
  // ******* Login Closed ********* //
}

module.exports = UserController;
