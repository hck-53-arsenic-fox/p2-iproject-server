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

  
}

module.exports = UserController;
