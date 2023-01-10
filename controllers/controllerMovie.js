const { Favorite, Movie, User } = require('../models')

class controllerMovie{
    static async read(req, response,next) {
        try {
            let data = await Movie.findAll()
            response.status(200).json(data)
        } catch(error) {
            response.status(500).json({message:'Internal Server Error'})
        }

    }
}
module.exports=controllerMovie