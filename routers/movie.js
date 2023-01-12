const express = require('express')
const router = express.Router()
const controllerMovie = require('../controllers/controllerMovie')
const { authentication, authorization } = require('../middlewares/middleware')

router.get('/allmovie',authentication,controllerMovie.read)
router.get('/favorite/allfavorite',authentication,controllerMovie.allFav)
router.patch('/payment',authentication,controllerMovie.payment)
router.post('/genmidtoken',authentication,controllerMovie.genMidToken)
router.get('/detail/:id',authentication,authorization,controllerMovie.readById)
router.post('/favorite/:id',authentication,controllerMovie.favorite)
router.delete('/favorite/:id',authentication,controllerMovie.deleteFav)

module.exports=router