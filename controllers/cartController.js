const { Cart, Product } = require('../models/index')

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
}


module.exports = CartController