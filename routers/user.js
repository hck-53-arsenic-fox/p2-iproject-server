const express = require('express') 
const router = express.Router();
const Controller = require('../controllers/controller');
const {Authentication} = require('../middleware/Authentication');

router.get('/commingsoon', Controller.ReadAllComingSoon)
router.post('/register', Controller.Register)
router.post('/login', Controller.Login)
router.get('/movies', Controller.ReadAllMovie)
router.get('/theaters', Controller.ReadAllTheater)
router.post('/otp', Controller.RenderOtp)
router.get('/movies/:id', Controller.ReadMovieById)
router.get('/theaters/:id', Controller.ReadTheaterById)
router.use(Authentication)
router.post('/cinema/:id' ,Controller.CreateTicket)
router.post('/checkout/:id',Controller.GetTokenMidtrans)
router.patch('/editstatus/:id',Controller.EditStatus )

module.exports = router