const UserController = require('../controller/userController')

const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('index user')
})

router.post('/login', UserController.firebaseLogin)
router.post('/register', UserController.firebaseRegister)

module.exports = router