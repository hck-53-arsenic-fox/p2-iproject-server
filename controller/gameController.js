const { Game } = require('../models')
const axios = require('axios')

class GameController {
static async fetchGames(req, res, next) {
    try {

        const { search, platformsId, page } = req.query

        let query = {
            key: 'a26aaccbb2434aff82524efd6a88ec10',
            page_size: 24,
            platforms: 18,
            search
        }

        if(page) {
            query.page = page
        }

        if(platformsId) {
            query.platforms = platformsId
        }
        
        const { data } = await axios({
            url: 'https://api.rawg.io/api/games',
            method: 'GET',
            params: query
        })

        const gamesData = data.results.map(el => {
            let temp = {
                id: el.id,
                name: el.name,
                imageUrl: el.background_image,
                released_date: el.released,
                platforms: el.platforms
            }
            return temp
        })
        res.status(200).json({games: gamesData, currentPage: page || 1})
    } catch (err) {
        next(err)
    }
}
}

module.exports = GameController