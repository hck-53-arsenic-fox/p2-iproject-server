const router = require('express').Router()
const Users = require('../controllers/user')
const { User } = require('../models')

router.post('/register', Users.register )
router.post('/login', Users.login )
router.get('/anime', Users.anime )
router.post('/generate-midtrans-token', Users.midtrans )
module.exports = router