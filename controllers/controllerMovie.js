const { Favorite, Movie, User } = require('../models')
const midtransClient = require('midtrans-client');

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
    static async payment(req,response){
        try {
            await User.update({status:'Premium'},{where:{id:req.user.id}})
            response.status(200).json({message:`Your status Premium Now`})
        } catch (error) {
            response.status(500).json({message:'Internal Server Error'})
        }
    }
    static async genMidToken(req,response){
        try {
            const findUser = await User.findByPk(req.user.id)
            if(findUser.status==='Premium'){
                throw{name:'Already_Premium'}
            }
            let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                transaction_details: {
                    order_id: "TRANSACTION_"+Math.floor(1000000+Math.random()*9000000),
                    gross_amount: 10000
                },
                credit_card:{
                    secure : true
                },
                customer_details: {
                    email: findUser.email
                }
            };

        const midtransToken = await snap.createTransaction(parameter) 
        response.status(201).json(midtransToken)
        } catch (error) {
            if(error.name==='Already_Premium'){
                response.status(400).json({message:'Already Premium'})
            }
        }
    }
}
module.exports=controllerMovie