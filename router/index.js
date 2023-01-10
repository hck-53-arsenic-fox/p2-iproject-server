const express = require('express').Router()
const router = express
const userRoute = require('./userRouter')
const gamesRoute = require('./gamesRouter')
const consoleRoute = require('./consoleRouter')

router.use('/users', userRoute)
router.use('/games', gamesRoute)
router.use('/console', consoleRoute)

router.get('/', (req, res) => {
    res.status(200).json({message: 'ok'})
})

module.exports = router