const midtransClient = require("midtrans-client");
const { User, Cart, Movie } = require("../models");

class MidtransController {
  static async subscription(req, res, next) {
    try {
      await User.update(
        { status: "Premium" },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res
        .status(200)
        .json({ msg: `user with id ${req.user.id} now is Premium` });
    } catch (error) {
      next(error);
    }
  }

  static async mitrans(req, res, next) {
    try {
        const findUser = await User.findByPk(req.user.id)
        if (findUser.status === "Premium") {
            throw {name : "already_premium" }
        }
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : process.env.MITRANS_KEY
        });
     
    let parameter = {
        "transaction_details": {
            "order_id": "TRANSACTION" + Math.floor(1000000 + Math.random()* 9000000),
            "gross_amount": 100000
        },
        "credit_card":{
            "secure" : true
        },
        "customer_details": {
            // "first_name": "budi",
            // "last_name": "pratama",
            email: findUser.email,
            // "phone": "08111222333"
        }, 
    };
    const midrtansToken =  await snap.createTransaction(parameter)
    res.status(201).json(midrtansToken)
    } catch (error) {
        next(error)
    }
  }
}

module.exports = MidtransController;
