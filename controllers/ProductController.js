const axios = require("axios");
const midtransClient = require("midtrans-client");

class ProductController {
  static async getGames(req, res, next) {
    try {
      let { page_size, search } = req.query;
      const { data } = await axios({
        method: "GET",
        url: "https://api.rawg.io/api/games",
        params: {
          key: process.env.RAWG_API_KEY,
          page_size,
          search,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getDetails(req, res, next) {
    try {
      const { slug } = req.params;
      const { data } = await axios({
        method: "GET",
        url: `https://api.rawg.io/api/games/${slug}`,
        params: {
          key: process.env.RAWG_API_KEY,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async buyGame(req, res, next) {
    try {
      const { slug } = req.params;
      res.status(200).json({ message: "You now own this game" });
    } catch (err) {
      next(err);
    }
  }

  static async generateMidtransToken(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: Math.floor(Math.random() * Math.pow(10, 14)),
          gross_amount: 600000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user.email,
        },
      };
      const midtrans_token = await snap.createTransaction(parameter);
      res.status(200).json(midtrans_token);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
