const { Game, RentData } = require("../models");
const axios = require("axios");
const midtransClient = require("midtrans-client");

class GameController {
  static async fetchGames(req, res, next) {
    try {
      const { search, platformsId, page } = req.query;

      let query = {
        key: "a26aaccbb2434aff82524efd6a88ec10",
        page_size: 24,
        platforms: 18,
        search,
      };

      if (page) {
        query.page = page;
      }

      if (platformsId) {
        query.platforms = platformsId;
      }

      const { data } = await axios({
        url: "https://api.rawg.io/api/games",
        method: "GET",
        params: query,
      });

      const gamesData = data.results.map((el) => {
        let temp = {
          id: el.id,
          name: el.name,
          imageUrl: el.background_image,
          released_date: el.released,
          platforms: el.platforms,
          price: 50000,
        };
        return temp;
      });
      res.status(200).json({ games: gamesData, currentPage: page || 1 });
    } catch (err) {
      next(err);
    }
  }

  static async checkoutRentData(req, res, next) {
    try {
      const { user, day, ConsoleId, GameId, total_price, transaction_token } =
        req.body;


      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-JITKYxSUV097vYMFgtmBh3xB",
      });

      let parameter = {
        transaction_details: {
          order_id: transaction_token,
          gross_amount: total_price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user,
        },
      };

      const midtransTransaction = await snap.createTransaction(parameter);

      const rentData = await RentData.create({
        user,
        day,
        ConsoleId,
        GameId,
        total_price,
      });

      res.status(201).json( midtransTransaction );
    } catch (err) {
      next(err);
    }
  }
}

module.exports = GameController;
