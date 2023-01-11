const { Favorite, Movie, User } = require('../models')
const midtransClient = require('midtrans-client');

class controllerMovie{
    static async read(req, response,next) {
        const { page } = req.query;
        const paramQuerySQL = {};
        let limit=15;
        let offset=0;

        // pagination
            if (page !== '' && typeof page !== 'undefined') {
                offset=page*limit-limit
                paramQuerySQL.offset = offset;
            }
            paramQuerySQL.limit=limit
        
        try {
            let data = await Movie.findAndCountAll(paramQuerySQL)
            response.status(200).json({
                movies : data.rows,
                totalMovies : data.count,
                totalPage : Math.ceil(data.count/limit),
                rowsPerPage : limit,
                currentPage : page?.number||1
            })
        } catch(error) {
            response.status(500).json({message:'Internal Server Error'})
        }

    }
    static async readById(req, response) {
        try {
            let {id} = req.params
            let userId = req.user.id
            let dataUser = await User.findByPk(userId)
            if(dataUser.email==='Basic'){
                throw{name:'YourStatusNotPremium'}
            }
            let data = await Movie.findByPk(id)
            data.genre=JSON.parse(data.genre)
            data.director=JSON.parse(data.director)
            data.writers=JSON.parse(data.writers)
            response.status(200).json(data)
        } catch(err) {
            if(err.name==="YourStatusNotPremium"){
                response.status(400).json({message:"Your Status Not Premium"})

            }
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
        let UserId = req.user.id
        try {
            let data = await Favorite.findAll({where:{UserId},attributes:{exclude:['createdAt','updatedAt']}, include: [{ model: Movie,attributes:{exclude:['createdAt','updatedAt']} }] })
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

            let orderId = new Date().getTime()

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
        response.status(201).json({midtransToken,orderId:orderId})
        } catch (error) {
            if(error.name==='Already_Premium'){
                response.status(400).json({message:'Already Premium'})
            }
        }
    }
}
module.exports=controllerMovie