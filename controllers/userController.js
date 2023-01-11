const { User } = require("../models");
const { comparehash } = require("../helper/bcryps");
const { createToken } = require("../helper/jwt");
const axios = require("axios");
const midtransClient = require("midtrans-client");

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


  // ******* Username Open ******** //
  static async userName(req, res, next) {
    try {
      let data = await User.findByPk(req.user.id);
      res.status(200).json(data.username);
    } catch (error) {
      next(error)
    }
  }
  // ******* Username Closes ******** //

// ******* Profile Open ********* //
static async profile(req, res, next) {
  try {
    const getUser = await User.findByPk(req.user.id);
    res
      .status(200)
      .json({ id: getUser.id, isSubscribed: getUser.isSubscribed });
  } catch (error) {
    next(error);
  }
}
// ******* Profile Closed ********* //

// ******** Midtrans Payment Open ************* //
static async midtrans(req, res, next) {
  try {
    const findUser = User.findByPk(req.user.id);
    if (findUser.isSubscribed) throw { name: `User already subscribed` };
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });
    let parameter = {
      transaction_details: {
        order_id:
          "TRANSACTION" + Math.floor(1000000 + Math.random() * 9000000),
        gross_amount: 150000,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        username: findUser.username,
        email: findUser.email,
      },
    };
    const paymentToken = await snap.createTransaction(parameter);
    // console.log(paymentToken, "<<<< paymentToken");
    res.status(201).json(paymentToken);
  } catch (error) {
    next(error);
  }
}
// ******** Midtrans Payment Closed ************* //
}

module.exports = UserController;
