const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('index console')
})

module.exports = router