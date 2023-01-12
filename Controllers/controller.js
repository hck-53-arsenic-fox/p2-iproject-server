const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios')
const { compareHash } = require('../helpers/bcrypt')
const { createWebToken } = require('../helpers/jwt')
const midtransClient = require('midtrans-client')

class Controller {
static async handleRegister(req,res,next){
    try {
        const {email, password, name} = req.body
        const dataUser = await User.create({email, password, name})
        res.status(201).json({id:dataUser.id, email: dataUser.email})
    } catch (error) {
        next(error)
        
    }
}

static async handleLogin(req,res,next){
    try {
        let {email, password} = req.body
        if(!email || !password){
            throw ({name: "EmailPasswordRequired"})
        }
        let loginData = await User.findOne({where: {email}})
        if(!loginData){
            throw ({name : "InvalidCredintials"})
        }
        let compareData = compareHash(password, loginData.password)
        if(!compareData){
            throw ({name : "InvalidEmailOrPassword"})
        }
        let payload = {
            id: loginData.id
        }
        let access_token = createWebToken(payload)
        res.status(200).json({
            access_token,
            email: loginData.email,
            role: loginData.role
        })
    } catch (error) {
        next(error)
        
    }
}
static async googleLogin(req, res, next){
    try {
        const token = req.headers.google_token
    const CLIENT_ID = process.env.CLIENT_ID
        const client = new OAuth2Client(CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  
        });
        
        const payloadEmailGoogle = ticket.getPayload();

        const [user, created]  = await User.findOrCreate({
            where: {
                email : payloadEmailGoogle.email,
            },
            defaults: {
                email: payloadEmailGoogle.email,
                password: "SECRETNUMBER",
                role: "Unsubscribe",
                name: payloadEmailGoogle.name
                
            },
            hooks: false
        })

        let payload = {
            id: user.id
        }
        let access_token = createWebToken(payload)
        res.status(200).json({
            
            access_token,
            email: user.email,
            role: user.role,
        
        })
        

    } catch (error) {
        
        next(error)
        
    }
}



static async basketBallLiveMatch(req,res,next){
   try {
    const {data} = await axios({
        method: 'GET',
        url: 'https://sports-live-scores.p.rapidapi.com/basketball/live',
        headers: {
        'X-RapidAPI-Key': 'b0b592825amsh8aa492f3e90b092p19339bjsn56a24ab2b209',
        'X-RapidAPI-Host': 'sports-live-scores.p.rapidapi.com'
        }
    })
    res.status(200).json(data)
   } catch (error) {
   next(error)
   }
}



static async articleBasket(req,res,next){
    try {
        const {data} = await axios({
            method: 'GET',
            url: 'https://nba-latest-news.p.rapidapi.com/articles',
            params: {limit: '12'},
            headers: {
                'X-RapidAPI-Key': 'e4f8a1d344mshe4bc4c7dffe4ecdp134e6ejsnea0ff7a82635',
                'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com'
              }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
       next(error)
        
    }
}

static async teamsBasket(req,res,next){
    const {page} = req.query
    const paramQuerySQL = {}
    let limit = 5
    let offset = 0

    if(page !== '' && typeof page !== 'undefined'){
        offset = page * limit - limit
        paramQuerySQL.offset = offset
    }
    paramQuerySQL.limit = limit

    try {
        const {data} = await axios({
            method: 'GET',
            url: 'https://free-nba.p.rapidapi.com/teams',
            headers: {
                'X-RapidAPI-Key': 'b0b592825amsh8aa492f3e90b092p19339bjsn56a24ab2b209',
                'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
            }
        })
        res.status(200).json(data)
    } catch (error) {
        next(error)
        
    }
}



static async subscribe(req,res,next){
    try {
        let {id} = req.user
        let {role} = req.body
        let userById = await User.findByPk(id)
        if(!userById){
            throw ({name: "DataNotFound"})
        }
        let updateStatus = await userById.update({role: "Subscribe"}, {where: {id}})
        res.status(201).json(updateStatus)
    } catch (error) {
       next(error)
        
    }
}

static async midtransToken(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (user.role == "Subscribe") {
        throw { name: "Already Subscribe" };
      }

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: 100000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(200).json(midtransToken);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }


}

module.exports = Controller