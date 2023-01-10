const axios = require('axios');
const cleanData = require('../helpers/cleanData');
const { BMI } = require('../models/index');
const apiKey = 'LnTdszKK5942owHNm22B';

class Controller {
  static async countryList(req, res, next) {
    try {
      const countries = await BMI.findAll({
        attributes: ['iso_a3', 'country'],
      });

      res.status(200).json(countries);
    } catch (error) {
      console.log(error);
    }
  }

  static async relativePrices(req, res, next) {
    try {
      const { countryCode } = req.params;
      const iso_a3 = countryCode.toUpperCase();

      const selected = await BMI.findOne({
        where: {
          iso_a3,
        },
      });

      const {
        dollar_price: countryDollarPrice,
        currency_code,
        dollar_ex,
      } = await BMI.findOne({
        where: {
          iso_a3,
        },
      });

      const data = await BMI.findAll();

      const relative2 = [];

      const relativePrices = data.map((el) => {
        let result = {
          iso_a3: el.iso_a3,
          country: el.country,
        };
        const relativePrice = (el.dollar_price / countryDollarPrice - 1) * 100;

        // result[`relative_price_to_${currency_code}`] =
        //   relativePrice > 0
        //     ? `+${relativePrice.toFixed(0)}%`
        //     : relativePrice.toFixed(0) + '%';

        result[`relative_price_to_${currency_code}`] = relativePrice.toFixed(0);

        result[`${currency_code}_price`] = (
          el.dollar_price * dollar_ex
        ).toFixed(2);

        // if (el.country !== 'Israel' || el.country !== 'Lebanon') {
        //   relative2.push(result);
        // }

        return result;
      });

      res.send({ selected, relativePrices });
    } catch (error) {
      console.log(error);
    }
  }

  static async dataByCountry(req, res, next) {
    try {
      const { countryCode } = req.params;
      const iso_a3 = countryCode.toUpperCase();

      const { data: raw } = await axios.get(
        `https://data.nasdaq.com/api/v3/datasets/ECONOMIST/BIGMAC_${iso_a3}?api_key=${apiKey}`
      );

      const data = cleanData(raw);
      res.status(200).send(data);
      // res.send(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
