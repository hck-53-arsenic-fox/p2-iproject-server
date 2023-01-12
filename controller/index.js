const { createToken, comparePassword, sendNodemailer } = require("../helpers");
const { User } = require("../models");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const midtransClient = require("midtrans-client");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const register = await User.create({
        email,
        password,
        status: "Regular",
      });
      res.status(201).json({ id: register.id, email: register.email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        throw { name: "Credential" };
      }

      const validatePassword = comparePassword(password, user.password);

      if (!validatePassword) {
        throw { name: "Credential" };
      }

      let payload = { id: user.id };
      const access_token = createToken(payload);

      res
        .status(200)
        .json({ access_token, email: user.email, status: user.status });
    } catch (err) {
      next(err);
    }
  }
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

  static async upgradeStatus(req, res, next) {
    try {
      const { id } = req.user;
      const { status = "VIP" } = req.body;

      const foundUser = await User.findByPk(id);

      if (!foundUser) {
        throw { name: "Not Found" };
      }

      await User.update(
        {
          status,
        },
        { where: { id } }
      );

      res.status(200).json({
        message: `${foundUser.email} success updated status into ${status}`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async midtransToken(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (user.status == "VIP") {
        throw { name: "Already Upgrade" };
      }

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: 100000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      sendNodemailer(user.email);
      res.status(200).json(midtransToken);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async newsTechnology(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          category: "technology",
          apiKey: "b71cae684007438599cb5d78663120cd",
          pageSize: 6,
        },
      });
      let newData = data.articles.map((el, index) => {
        el.source.id = index + 1;
        return el;
      });
      res.status(200).json(newData);
    } catch (err) {
      next(err);
    }
  }

  static async newsTechnologyById(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          category: "technology",
          apiKey: "b71cae684007438599cb5d78663120cd",
        },
      });
      let newData = data.articles.map((el, index) => {
        el.source.id = index + 1;
        return el;
      });
      let dataById = newData.filter((el) => el.source.id == req.params.id);
      res.status(200).json(dataById);
    } catch (err) {
      next(err);
    }
  }

  static async newsPolitics(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          category: "politics",
          apiKey: "b71cae684007438599cb5d78663120cd",
          pageSize: 6,
        },
      });
      let newData = data.articles.map((el, index) => {
        el.source.id = index + 1;
        return el;
      });
      res.status(200).json(newData);
    } catch (err) {
      next(err);
    }
  }

  static async newsPoliticsById(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          category: "politics",
          apiKey: "b71cae684007438599cb5d78663120cd",
        },
      });
      let newData = data.articles.map((el, index) => {
        el.source.id = index + 1;
        return el;
      });
      let dataById = newData.filter((el) => el.source.id == req.params.id);
      res.status(200).json(dataById);
    } catch (err) {
      next(err);
    }
  }

  static async newsBusiness(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          category: "business",
          apiKey: "b71cae684007438599cb5d78663120cd",
          pageSize: 6,
        },
      });
      let newData = data.articles.map((el, index) => {
        el.source.id = index + 1;
        return el;
      });
      res.status(200).json(newData);
    } catch (err) {
      next(err);
    }
  }

  static async newsBusinessById(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          category: "business",
          apiKey: "b71cae684007438599cb5d78663120cd",
        },
      });
      let newData = data.articles.map((el, index) => {
        el.source.id = index + 1;
        return el;
      });
      let dataById = newData.filter((el) => el.source.id == req.params.id);
      res.status(200).json(dataById);
    } catch (err) {
      next(err);
    }
  }

  static async newsSports(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          category: "sports",
          apiKey: "b71cae684007438599cb5d78663120cd",
          pageSize: 6,
        },
      });
      let newData = data.articles.map((el, index) => {
        el.source.id = index + 1;
        return el;
      });
      res.status(200).json(newData);
    } catch (err) {
      next(err);
    }
  }

  static async newsSportsById(req, res, next) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://newsapi.org/v2/top-headlines",
        params: {
          country: "id",
          category: "sports",
          apiKey: "b71cae684007438599cb5d78663120cd",
        },
      });
      let newData = data.articles.map((el, index) => {
        el.source.id = index + 1;
        return el;
      });
      let dataById = newData.filter((el) => el.source.id == req.params.id);
      res.status(200).json(dataById);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = Controller;
