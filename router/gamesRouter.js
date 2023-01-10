const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('index games')
})

module.exports = router