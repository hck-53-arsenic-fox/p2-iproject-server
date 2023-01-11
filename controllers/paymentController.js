const axios = require('axios');
const cleanData = require('../helpers/cleanData');
const { BMI, Wage } = require('../models/index');
const apiKey = 'LnTdszKK5942owHNm22B';
const midtransClient = require('midtrans-client');

class PaymentController {
  static async generateToken(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-iiUsBrNdSrZQOzBRdsrWOrpL',
      });

      let parameter = {
        transaction_details: {
          order_id: 'transaction_' + Math.ceil(Math.random() * 1000000 + 99999),
          gross_amount: 35000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          name: 'Guest',
        },
      };

      const { token } = await snap.createTransaction(parameter);
      console.log(token);
      res.status(201).json({ token });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PaymentController;
