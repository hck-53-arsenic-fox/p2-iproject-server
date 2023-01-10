const { Favorite, Movie, User } = require('../models')

class controllerMovie{
    static async read(req, response,next) {
        const { page } = req.query;
        const paramQuerySQL = {};
        let limit;
        let offset;

        // pagination
        if (page !== '' && typeof page !== 'undefined') {
        if (page.size !== '' && typeof page.size !== 'undefined') {
            limit = page.size;
            paramQuerySQL.limit = limit;
        }

        if (page.number !== '' && typeof page.number !== 'undefined') {
            offset = page.number * limit - limit;
            paramQuerySQL.offset = offset;
        }
        } else {
        limit = 20; 
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
        }
        try {
            let data = await Movie.findAll(paramQuerySQL)
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