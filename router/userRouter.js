const UserController = require('../controller/userController')

const router = require('express').Router()


router.get('/', (req, res) => {
    res.send('index user')
})

router.post('/login', UserController.firebaseLogin)
router.post('/login-google', UserController.firebaseLoginGoogle)

module.exports = router