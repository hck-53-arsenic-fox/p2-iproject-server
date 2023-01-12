const {User,Movie, Theater,Schedule, Cinema , Otp} = require('../models');
const {comparePassword} = require('../helpers/bcrypt');
const {createToken} = require('../helpers/jsonwebtoken');
const axios = require('axios');
const midtransClient = require('midtrans-client');


class Controller{
    
    static async Register(req,res,next){
        try {
            
            const {name , email , password , address , telepon , otp} = req.body 

            if(!telepon){
                throw({name: 'Phone Number is required'})
            }

            if(!otp){
                throw({name: 'Otp is required'})
            }

            const user = await Otp.findOne({
                where: {code: otp , phoneNumber: telepon}
           })

            if(!user){
                throw({name: 'Phone number/OTP invalid'})
            }

            if(!name){
                throw({name: 'Name is required'})
            }

            if(!email){
                throw({name: 'Email is required'})
            }

            if(!password){
                throw({name: 'Password is required'})
            }

            if(!address){
                throw({name: ' is required'})
            }

            await User.create({name , email , password , address})

            res.status(201).json({name , email , password , address})

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async Login(req,res,next){
        try {
            const {email , password} = req.body
         
            if(!email){
                throw({name: 'Email is required'})
            }

            if(!password){
                throw({name: 'Password is required'})
            }

            let user = await User.findOne({where: {email}})

            if(!user){
                throw ({name: "Invalid Email Or Password"})
            }

            let comparePass = comparePassword(password, user.password)
         
            if(comparePass === false){
                throw ({name: "Invalid Email Or Password"})
            }


                    
                let payload = {id: user.id} 

                const access_token = createToken(payload)
                
                res.status(200).json({msg: 'Succesfully login', email: user.email, access_token})

        } catch (error) {
            next(error)
        }
    }
    
    static async ReadAllMovie(req,res,next){
        try {
            const { page } = req.query; 
            const paramsQuerySQL = {}
            
            let limit = 4
            let offset = 0 

            if(page !== '' && typeof page !== "undefined"){
                offset = page * limit - limit
                paramsQuerySQL.offset = offset
            }

            paramsQuerySQL.limit = limit

            let movies = await Movie.findAndCountAll(paramsQuerySQL)
            res.status(200).json(movies)

        } catch (error) {
            next(error)
        }
    }

    static async ReadMovieById(req,res,next){
        try {
            const {id} = req.params

            let movie = await Movie.findByPk(id)

            if(!movie){
                throw({name: 'Movie not found'})
            }

            res.status(200).json(movie)

        } catch (error) {
            next(error)
        }
    }

    static async ReadAllTheater(req,res,next){
        try {
            let theaters = await Theater.findAll({
                attributes: ['id','name']
            })
            res.status(200).json(theaters)
        } catch (error) {
            next(error)
        }
    }

    static async ReadTheaterById(req,res,next){
        try {
            const {id} = req.params

            let theater = await Schedule.findAll({
                where: {
                    TheaterId: id 
                },
                include: Movie,
                raw: true
            })


            let listMovie = []

            theater.forEach(movie => {
                let datum = listMovie.find(el => el.MovieId === movie.MovieId)
                if(!datum){
                    listMovie.push({...movie, schedule: [{id: movie.id , time: movie.schedule}]})
                } else {
                    datum.schedule.push({id: movie.id , time: movie.schedule})
                }
            });

        
            listMovie = listMovie.map(el => {
                return {
                    title: el["Movie.title"], 
                    imageUrl: el["Movie.imageUrl"], 
                    id: el["Movie.id"], 
                    duration: el["Movie.duration"], 
                    schedule: el["schedule"]
                }
            })

            let theaterId = await Theater.findByPk(id)

            res.status(200).json([theaterId,listMovie])
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async CreateTicket(req,res,next){
        try {
            const {id} = req.params
            const userId = req.user.id
            const {seatNumber , status , transfer_recipe} = req.body

            await Cinema.create({ScheduleId: id , UserId: userId , seatNumber , status , transfer_recipe })

            res.status(201).json({message: 'Sucessfully create cinema'})
        } catch (error) {
            next(error)
        }
    }

    static async RenderOtp(req,res,next){
        try {
        const {telepon} = req.body
        let codeOtp = ''
            
        const test =  await axios({
                method: 'POST', 
                url: 'https://nabasa.co.id/api_marsit_v1/tes.php/mathiasOtp', 
                data: {
                    telepon
                }
        })

        codeOtp = test.data.Save_Otp.kode_otp 

        await Otp.create({phoneNumber: telepon , code: codeOtp})

        res.status(201).json({message: 'Sucessfully create OTP'})
            
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async GetTokenMidtrans(req,res,next){

        let snap = new midtransClient.Snap({
            isProduction : false,
            serverKey : process.env.MIDTRANS_KEY
        });
    

        let parameter = {
            "transaction_details": {
                "order_id": `MOV-ORDERID-${new Date().getTime()}`,
                "gross_amount": 35000
            },

            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "budi",
                "last_name": "pratama",
                "email": "budi.pra@example.com",
                "phone": "08111222333"
            }
        };
    
        const midtranstoken = await snap.createTransaction(parameter);
        res.status(200).json(midtranstoken);
        
    }

    static async ReadAllComingSoon(req,res,next){
        try {
            let response = await axios({
                url: 'https://imdb-api.com/en/API/ComingSoon/', 
                method: 'GET',
                params: {
                    apiKey: 'k_a0ts1qjc'
                }
            })
            res.status(200).json(response.data.items);
        } catch (error) {
            next(error)
        }
    }

    static async EditStatus(req , res , next){
        try {
            const {id} = req.params 

            await Cinema.update({
                status: 'Paid'
            }, {where : {id}})

            res.status(200).json({message: 'Success edit data'})
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controller