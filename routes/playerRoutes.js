const PlayerController = require('../controllers/PlayerController')
const router = require('express').Router()

router.get('/', PlayerController.getPlayers)
router.get('/:id', PlayerController.getPlayerProfile)



module.exports = router