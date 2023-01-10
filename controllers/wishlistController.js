const { Product, Wishlist } = require('../models/index')

class WishlistController {
    static async getWishlist (req, res, next) {
        try {
            const UserId = req.user.id

            const wishlist = await Wishlist.findAll({
                where: {
                    UserId
                },
                include: Product
            })

            res.status(200).json(wishlist)
        } catch (err) {
            next(err)
        }
    }

    static async postWishlist(req, res, next) {
        try {
            const UserId = req.user.id;
            const { ProductId } = req.params;

            const product = await Product.findByPk(ProductId);
            if (!product) {
                 throw {
                      name: "DataShowProductNotFound",
                 };
            }

            const newWishlist = await Wishlist.create({
                UserId,
                ProductId,
           });

           res.status(201).json(newWishlist);

        } catch (err) {
            next(err)
        }
    }

    static async deleteWishlist(req, res, next) {
        try {
            const {id} = req.params

            const wishlist = await Wishlist.findByPk(id)
            if (!wishlist) {
                throw { name: 'Wishlistnotfound' }
            }

            await Wishlist.destroy({
                where: {id}
            })
            res.status(200).json('Wishlist successfully deleted')

        } catch (err) {
            next(err)
        }
    }
}



module.exports = WishlistController