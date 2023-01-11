const axios = require("axios");

class ProductController {
  static async getGames(req, res, next) {
    try {
      let { page } = req.query;
      if (!page) {
        page = 1;
      }
      const { data } = await axios({
        method: "GET",
        url: "https://api.rawg.io/api/games",
        params: {
          key: process.env.RAWG_API_KEY,
          page,
          page_size: 9,
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

  static async buyGame(req, res, next) {}
}

module.exports = ProductController;
