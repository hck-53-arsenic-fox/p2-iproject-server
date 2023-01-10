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

}


module.exports = CartController