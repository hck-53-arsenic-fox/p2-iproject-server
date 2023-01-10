const GameController = require('../controller/gameController')

const router = require('express').Router()


router.get('/', GameController.fetchGames)



module.exports = router