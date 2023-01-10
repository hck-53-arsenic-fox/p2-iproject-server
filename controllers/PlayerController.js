const { User, Player, Favorite } = require('../models')

class PlayerController {
    static async getPlayers(req, res, next) {
        try {
            const dataPlayer = await Player.findAll({
                
            })

            console.log(dataPlayer);
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = PlayerController