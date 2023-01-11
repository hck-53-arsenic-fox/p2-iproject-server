const axios = require("axios");

class ProductController {
  static async getMakes(req, res, next) {
    const options = {
      method: "GET",
      url: "https://car-data.p.rapidapi.com/cars/makes",
      headers: {
        "X-RapidAPI-Key": "a111574fc7msh2da773cb450db04p1c5521jsn7ac8a1aaf0e5",
        "X-RapidAPI-Host": "car-data.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (err) {
        next(err);
      });
  }

  static async getTypes(req, res, next) {
    const options = {
      method: "GET",
      url: "https://car-data.p.rapidapi.com/cars/types",
      headers: {
        "X-RapidAPI-Key": "a111574fc7msh2da773cb450db04p1c5521jsn7ac8a1aaf0e5",
        "X-RapidAPI-Host": "car-data.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (err) {
        next(err);
      });
  }

  static async getYears(req, res, next) {
    const options = {
      method: "GET",
      url: "https://car-data.p.rapidapi.com/cars/years",
      headers: {
        "X-RapidAPI-Key": "a111574fc7msh2da773cb450db04p1c5521jsn7ac8a1aaf0e5",
        "X-RapidAPI-Host": "car-data.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (err) {
        next(err);
      });
  }

  static async getCars(req, res, next) {
    const { page, make, type } = req.query;
    const options = {
      method: "GET",
      url: "https://car-data.p.rapidapi.com/cars",
      params: { limit: "10", page, make, type, year },
      headers: {
        "X-RapidAPI-Key": "a111574fc7msh2da773cb450db04p1c5521jsn7ac8a1aaf0e5",
        "X-RapidAPI-Host": "car-data.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        res.status(200).json(response.data);
      })
      .catch(function (err) {
        next(err);
      });
  }

  static async buyCar(req, res, next) {
    const { make, type, model, year } = req.query;
    
  }
}

module.exports = ProductController;
