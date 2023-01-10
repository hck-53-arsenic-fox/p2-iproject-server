const { Game } = require('../models')
const axios = require('axios')

class GameController {
static async fetchGames(req, res, next) {
    try {
        const { search, platformsId } = req.query
        let platforms = '18,187,186'
        if(platformsId) {
            platforms = +platformsId
        }
        
        const { data } = await axios({
            url: 'https://api.rawg.io/api/games',
            method: 'GET',
            params: {
                key: 'a26aaccbb2434aff82524efd6a88ec10',
                page_size: 24,
                platforms,
                search
            }
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

        res.status(200).json({next: data.next, previous: data.previous, games: gamesData})
    } catch (err) {
        next(err)
    }
}
}

module.exports = GameController