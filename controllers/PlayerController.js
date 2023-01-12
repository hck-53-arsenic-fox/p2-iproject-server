const { User, Player, Favorite } = require('../models')

class PlayerController {
    static async getPlayers(req, res, next) {
        try {
            // const { access_token } = req.headers
            // if (!access_token) throw { name: 'Invalid token' }

            const dataPlayer = await Player.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })

            res.status(200).json(dataPlayer)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getPlayerProfile(req, res, next) {
        try {
            const { id } = req.params

            const findPlayer = await Player.findByPk(id)
            if (!findPlayer) throw { name: 'Player not found' }

            res.status(200).json(findPlayer)

        } catch (error) {
            console.log(error, '<----');
            next(error)
        }
    }
}

module.exports = PlayerController