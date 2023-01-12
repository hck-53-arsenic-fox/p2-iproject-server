const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRouter')
const resortsRouter = require('./resortRouter')


router.use('/users', usersRouter)
router.use('/resorts', resortsRouter)


module.exports = router;