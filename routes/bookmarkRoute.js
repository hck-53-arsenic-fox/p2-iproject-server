const express = require('express');
const router = express.Router()
const ControllerBookmark = require('../controllers/bookmarkController');

router.get('/', ControllerBookmark.getBookMark)
router.post('/', ControllerBookmark.addBookMark)
router.delete('/:id', ControllerBookmark.deleteBookMark)

module.exports = router