const {User, Favorite} = require('../models')
const {signToken, verifyToken} = require('../helper/jwt')

async function authentication(req, res, next){
    try {
        console.log(req.headers);
        let access_token = req.headers.access_token
        if (!access_token){
            throw { name: "InvalidToken" } // err handler
        } 
        let payload = verifyToken(access_token)
        let client = await User.findOne({
            where: {id : payload.id, email: payload.email}
        })
        if (!client){
            throw { name : "InvalidToken"}
        } else {
            req.user = {id: client.id, email: client.email, status: client.status}
            next()
        }
    } catch(err) { 
        next(err)
    } 
}

async function authorization(req, res,next){
    try {
        let client = await User.findOne({
            where: {id : req.user.id}
        })
        if (client.status === 'Active'){
            next()
        }else{
            throw { name: "Forbidden"}
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {authentication, authorization}