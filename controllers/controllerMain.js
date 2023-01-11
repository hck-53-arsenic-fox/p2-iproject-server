const Axios = require("axios");
const { User, Exhibition } = require("../models");
const midtransClient = require("midtrans-client");

class controllerMain {
  static async fetchArtwork(req, res, next) {
    try {
      const { data } = await Axios.get(
        "https://api.artic.edu/api/v1/artworks?page=2&limit=100"
      );
      data.data = data.data.map((el) => {
        return {
          id: el.id,
          imgUrl: `https://www.artic.edu/iiif/2/${el.image_id}/full/843,/0/default.jpg`,
          title: el.title,
          artist: el.artist_title,
          description: el.medium_display,
        };
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async fetchExhibitions(req, res, next) {
    try {
      const data = await Exhibition.findAll();
      res.status(200).json(data);
    } catch (error) {
      next();
    }
  }
  static async buyTicketEvent(req, res, next) {
    try {
    } catch (error) {}
  }
  static async midtrans(req, res, next) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id);
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTIONS_" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: 69000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controllerMain;
