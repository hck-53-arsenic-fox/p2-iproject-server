const snap = require('../helpers/midtrans')
const nodemailerHelper = require('../helpers/nodeMailer')
const { Cart, Product, User } = require('../models/index')

class CartController {
    static async getCart (req, res, next) {
        try {
            const UserId = req.user.id

            const cart = await Cart.findAll({
                where: {
                    UserId
                },
                include: Product
            })
            if (!cart) {
                throw {name: 'Cartnotfound'}
            }

            res.status(200).json(cart)
        } catch (err) {
            next(err)
        }
    }

    static async postCart(req, res, next) {
        try {
            const UserId = req.user.id;
            const {amount} = req.body
            const { ProductId } = req.params;

            const product = await Product.findByPk(ProductId);
            if (!product) {
                 throw {
                      name: "DataShowProductNotFound",
                 };
            }

            await Cart.create({
                UserId,
                ProductId,
                amount
           });

           res.status(201).json(`${amount} of ${product.name} added to your cart`);

        } catch (err) {
            next(err)
        }
    }

    static async deleteCart(req, res, next) {
        try {
            const {id} = req.params

            const cart = await Cart.findByPk(id)
            if (!cart) {
                throw { name: 'Cartnotfound' }
            }

            await Cart.destroy({
                where: {id}
            })
            res.status(200).json('product successfully deleted from your cart')

        } catch (err) {
            next(err)
        }
    }


    static async midtrans(req, res, next) {
        try {
            const aidi = req.user.id
            const {id} = req.params
            const user = await User.findByPk(aidi)
            if (!user) {
                throw {name: 'UsernotFound'}
            }
            const cart = await Cart.findByPk(id, {include: Product})
            if (!cart) {
                throw {name: 'Cartnotfound'}
            }
            let totalPrice = cart.Product.price * cart.amount
            
            let parameter = {
                transaction_details: {
                     order_id: `YOUR-ORDERID-${new Date().getTime()}`,
                     gross_amount: totalPrice,
                },
                credit_card: {
                     secure: true,
                },
                customer_details: {
                     email: user.email
                },
           };

           const transaction = await snap.createTransaction(parameter)
           nodemailerHelper(user.email)
        //    this.deleteCart()
           res.status(200).json({token: transaction.token})
        } catch (err) {
            next(err)
        }
    }

}


module.exports = CartController