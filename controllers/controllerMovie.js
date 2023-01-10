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
    static async readById(req, response) {
        try {
            let {id} = req.params
            let data = await Movie.findByPk(id)
            response.status(200).json({data})
        } catch(err) {
            console.log(err);
            response.status(500).json({message:"internal server error"})
            response.status(404).json({message:"not found"})
        }

    }
}
module.exports=controllerMovie