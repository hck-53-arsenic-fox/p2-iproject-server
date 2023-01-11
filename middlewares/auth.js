const { convertToken } = require('../helpers/jwt')
const {User} = require('../models')

async function authentication(req,res,next){
    try {
        let {access_token} = req.headers
        
        if(!access_token){
            throw {name: "AccessTokenInvalid"}
        }
        let payload = convertToken(access_token)
        let findingUser = await User.findByPk(payload.id)
        if(!findingUser){
            throw {name : "AccessTokenInvalid"}
        }
        
        req.user = {
            id: findingUser.id,
            email: findingUser.email,
            role: findingUser.role
        }
        next()
    } catch (error) {
        next(error)
        
    }
}

module.exports = authentication