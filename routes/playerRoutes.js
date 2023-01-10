const PlayerController = require('../controllers/PlayerController')
const router = require('express').Router()

router.get('/', PlayerController.getPlayers)


module.exports = router