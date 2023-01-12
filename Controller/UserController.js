const { signToken, comparePassword } = require('../helper')
const { User } = require('../models/index')
const midtransClient = require('midtrans-client');
class UserController {
    static async register(req, res, next) {
        try {
            let { email, userName, password } = req.body
            let data = await User.create({ email, userName, password })
            res.status(201).json({ id: data.id, email: data.email })
        } catch (error) {
            next(error)
        }
    }
    static async login(request, response, next) {
        try {
            let { email, password } = request.body
            if (!email || !password) {
                throw { name: 'Please fill requirement data' }
            }
            let user = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw { name: 'invalidCredentials' }
            }
            let comparingPassword = comparePassword(password, user.password)
            if (!comparingPassword) {
                throw { name: 'invalidCredentials' }
            }
            let payload = {
                id: user.id
            }
            let acessToken = signToken(payload)
            let emailUser = user.email
            let userName = user.userName
            response.status(200).json({ acessToken, emailUser, userName,status:user.isSubscribed })
        } catch (error) {
            next(error)
        }
    }
    static async midtransPayment(req, res, next) {
        try {
            let userId = req.User.id
            const findUser = await User.findByPk(userId)
            if (findUser.isSubscribed) {
                throw { name: "already subscribed" }
            }
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });
            let parameter = {
                "transaction_details": {
                    "order_id": "Transaction_" + Math.floor(9000000 + Math.random() * 9000000),
                    "gross_amount": 100000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": findUser.email,
                }
            };
            const midtransToken= await snap.createTransaction(parameter)
            res.status(201).json(midtransToken)
        } catch (error) {
            next(error)
        }
    }
    static async updateStatus(req, res, next) {
        try {
            let userId = req.User.id
            let data = await User.update({ isSubscribed: true }, {
                where: {
                    id: userId
                }
            })
            console.log("berhasil")
            res.status(200).json({ message: `User with id ${userId} now is a subscriber` })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}
module.exports = UserController