const express = require('express')
const WishlistController = require('../controllers/wishlistController')
const wishlistRouter = express.Router()


wishlistRouter.get('/', WishlistController.getWishlist)
wishlistRouter.post('/:ProductId', WishlistController.postWishlist)
wishlistRouter.delete('/:id', WishlistController.deleteWishlist)



module.exports = wishlistRouter