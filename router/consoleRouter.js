const ConsoleController = require('../controller/consoleController')

const router = require('express').Router()

router.get('/', ConsoleController.fetchConsole)

module.exports = router