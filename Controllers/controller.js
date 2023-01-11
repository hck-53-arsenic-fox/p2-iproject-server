const {User} = require('../models')
const axios = require('axios')
const { compareHash } = require('../helpers/bcrypt')
const { createWebToken } = require('../helpers/jwt')

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
            headers: {
                'X-RapidAPI-Key': 'b0b592825amsh8aa492f3e90b092p19339bjsn56a24ab2b209',
                'X-RapidAPI-Host': 'nba-latest-news.p.rapidapi.com'
            }
        })
        res.status(200).json(data)
    } catch (error) {
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
        let {status} = req.body
        let userById = await User.findByPk(id)
        if(!userById){
            throw ({name: "DataNotFound"})
        }
        let updateStatus = await userById.update({status: "Subscribe"}, {where: {id}})
        res.status(201).json(updateStatus)
    } catch (error) {
       next(error)
        
    }
}


}

module.exports = Controller