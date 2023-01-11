const Axios = require("axios");
const { User, Exhibition, Transaction } = require("../models");
const midtransClient = require("midtrans-client");
const { kirimEmail } = require("../helpers/email");
const { formatDate } = require("../helpers/formatDate");

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
      const { id } = req.user;
      const { eventId } = req.params;
      const event = await Exhibition.findByPk(eventId);
      const user = await User.findByPk(id);
      const buy = await Transaction.create({
        title: event.title,
        description: `Buy ${event.title} tickets`,
        isPay: true,
        UserId: id,
        ExhibitionId: eventId,
      });
      const templateEmail = {
        from: "fazafirnanda@gmail.com",
        to: user.email,
        subject: "Invoice Useum",
        html: `<h1>Haii,</h1><p>${user.username}</p> 
        <p>Terima Kasih telah membeli ticket Exhibitions ${event.title}</p>
        <p>Jangan lupa utk datang ke Exhibition
            Tanggal ${formatDate(event.date)}<p>
        `,
      };
      kirimEmail(templateEmail);
      res.status(201).json(buy);
    } catch (error) {
      next(error);
    }
  }
  static async midtrans(req, res, next) {
    try {
      const { id } = req.user;
      const { eventId } = req.params;
      const user = await User.findByPk(id);
      const exhibitions = await Exhibition.findByPk(eventId);
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTIONS_" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: exhibitions.price,
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
