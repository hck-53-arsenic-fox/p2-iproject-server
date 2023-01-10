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
    static async favorite(req,response){
        try {
            let MovieId = req.params.id
            let UserId= req.user.id
            let allFav = await Favorite.findOne({where:{UserId,MovieId} })
            if(allFav){
                throw{name:"MovieAlreadyAdded"}
            }
            let dataFav = await Favorite.create({MovieId,UserId})
            response.status(201).json({message:"berhasil"})
        } catch (error) {
            if(error.name==="MovieAlreadyAdded"){
                response.status(400).json({message:'Movie Already Added'})
            }else{
                response.status(500).json({message:"internal server error"})
            }
        }
    }
    static async deleteFav(req,response){
        try {
            let {id} = req.params
            let data = await Favorite.findByPk(id)
            if(data===null){
                throw{
                    title:"DataNotValid",
                    msg:"Not Found"
                }
            }
            await Favorite.destroy({where:{id}})
            response.status(200).json({message:"Succes Delete"})
        } catch(error) {
            if(error.name==="DataNotValid"){
                response.status(404).json({message:err.msg})
            }else{
                response.status(500).json({message:"internal server error"})
            }
        }
    }
    static async allFav(req,response){
        const { page } = req.query;
        let UserId = req.user.id
        const paramQuerySQL = {where:{UserId},attributes:{exclude:['createdAt','updatedAt']}, include: [{ model: Movie,attributes:{exclude:['createdAt','updatedAt']} }] };
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
        limit = 6; 
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
        }
        try {
            let data = await Favorite.findAll(paramQuerySQL)
            response.status(200).json(data)
        } catch(error) {
            response.status(500).json({message:'Internal Server Error'})
        }
    }
}
module.exports=controllerMovie