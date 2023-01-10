const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('index user')
})

module.exports = router