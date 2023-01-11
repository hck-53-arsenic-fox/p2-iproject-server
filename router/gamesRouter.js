const GameController = require('../controller/gameController')
const { authz } = require('../middlewares/auth')

const router = require('express').Router()


router.get('/', GameController.fetchGames)

router.post('/rent', authz, GameController.checkoutRentData)


module.exports = router