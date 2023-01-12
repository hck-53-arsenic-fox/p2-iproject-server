const express = require('express');
const Controller = require('../controllers/controllerInvitation');
const { authentication } = require('../middleware/auth');
const router = express.Router();

router.get('/', Controller.getInvitation);
router.get('/:id', Controller.getInvitationById);
router.post('/', authentication, Controller.addInvitation);
router.post('/:id', authentication, Controller.editInvitation);


module.exports = router;