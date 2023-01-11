const axios = require("axios");

class ProductController {
  static async getMakes(req, res, next) {
    try {
      const options = {
        method: "GET",
        url: "https://car-data.p.rapidapi.com/cars/makes",
        headers: {
          "X-RapidAPI-Key":
            "a111574fc7msh2da773cb450db04p1c5521jsn7ac8a1aaf0e5",
          "X-RapidAPI-Host": "car-data.p.rapidapi.com",
        },
      };
      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
