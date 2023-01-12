const express = require('express')
const Characters = require('../Controller/AnimeList')
const router = express.Router()


router.get('/',Characters.showAnime)
router.get('/popular',Characters.showPopularAnime)
router.get('/videos',Characters.showVideos)
router.get('/:animeId',Characters.showAnimeById)
// router.get('/showGenshin',Controller.showGenshinCharacter)
// router.get('/showAnime',Controller.showAnime)
module.exports=router