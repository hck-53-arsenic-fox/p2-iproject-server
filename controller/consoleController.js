const { Console } = require('../models')

class ConsoleController {
    static async fetchConsole(req, res, next) {
        try {
            const console = await Console.findAll({
                attributes: {exclude: ['createdAt', 'updatedAt']}
            })

            res.status(200).json(console)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = ConsoleController