const express = require('express');
const router = express.Router()
const ControllerBookmark = require('../controllers/bookmarkController');

router.get('/', ControllerBookmark.getBookMark)
router.post('/:location_id', ControllerBookmark.addBookMark)
router.delete('/:location_id', ControllerBookmark.deleteBookMark)

module.exports = router