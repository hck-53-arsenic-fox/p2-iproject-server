const express = require('express');
const router = express.Router();
const Controller = require('../controllers/controllerIndex');
const handleError = require('../middleware/handleError');
const musicRouter = require('./musicRouter');
const greetRouter = require('./greetRouter');
const invRouter = require('./invRouter');


router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/google-sign-in', Controller.googleSignIn)
router.use('/musics', musicRouter)
router.use('/greets', greetRouter)
router.use('/invitations', invRouter)



router.use(handleError)

module.exports = router;