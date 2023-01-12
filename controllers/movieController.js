const axios = require("axios");

class movieController {
  static async getMovie(req, res, next) {
    try {
      let movie = await axios({
        url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=1 `,
        method: "GET",
      });
      res.status(200).json({ movie: movie.data });
    } catch (error) {
      next(error);
    }
  }


  static async getDetail(req, res, next) {
    try {
      let { id } = req.params;
      let { data } = await axios({
        url: `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`,
      });
      res.status(200).json({ movie: data });
    } catch (error) {
    next(error)
    }
  }
}

module.exports = movieController;