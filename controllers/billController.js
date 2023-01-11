const { UserBill, User, Bill } = require('../models/index')
const midtransClient = require('midtrans-client');


class BillController {

  static async getBillUser(req, res, next) {
    // console.log('masuk user bill <<<<<<<<<<');
    try {
      // console.log(req.user, '<<<');
      let { userId } = req.params
      // console.log(userId, 'params<<<<');
      let userBill = await UserBill.findOne({
        where: {
          UserId: userId
        },
        include: [User, Bill]
      })
      res.status(200).json({ userBill })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async payBillUser(req, res, next) {
    try {
      let { userId } = req.params
      let userBill = await UserBill.update({ status: 'Paid' }, {
        where: {
          UserId: userId
        },
        include: User
      })
      res.status(200).json({ message: `Bill belongs to ${userBill.User.username} has Paid` })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async generateMidtransToken(req, res, next) {
    try {
      const userId = req.user.id
      const bill = await await UserBill.findOne({
        where: {
          UserId: userId
        },
        include: [User, Bill]
      })

      console.log(bill, '<<<');
      const findUser = await User.findByPk(userId)

      //! nanti bisa buat validasi kalo udah status Paid, gabisa bayar lagi

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY
      });

      let parameter = {
        "transaction_details": {
          "order_id": `PAYBILL-${Math.ceil(25000000 + Math.random() * 10000000)}`, //must unique
          // "gross_amount": 25_000_000 //! bill from database
          "gross_amount": bill.Bill.amount //! bill from database
        },
        "credit_card": {
          "secure": true
        },
        "customer_details": {
          /* 
          //! Template Aslinya
          "first_name": "budi",
          "last_name": "pratama",
          "email": "budi.pra@example.com",
          "phone": "08111222333"
          */
          "email": findUser.email,
        }
      };

      const midtransToken = await snap.createTransaction(parameter)
      res.status(201).json(midtransToken)
      // console.log(midtransToken);
      // .then((transaction) => {
      //   // transaction token
      //   let transactionToken = transaction.token;
      //   console.log('transactionToken:', transactionToken);
      // })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


}

module.exports = BillController;