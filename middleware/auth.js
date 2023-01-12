const { decodedToken } = require("../helper/jwt")
const { Users } = require("../models")

async function authentication(req, res, next) {
    try {
        let { access_token } = req.headers

        
        if (!access_token) {
            throw { name: 'Unauthenticated' }
        }
        let payload = decodedToken(access_token)
        let user = await Users.findByPk(payload.id)
        
        if (!user) {
            throw { name: 'Unauthenticated' }
        }
        req.user = {
            role: user.role,
            id: user.id,
        }
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = {
    authentication, 
}