const { decodedToken } = require("../helpers/jwt")
const { User, Product } = require('../models/index')


async function auth(req, res, next) {
    try {
        let {access_token} = req.headers
        if (!access_token) {
            throw {name: 'Unauthenticated'}
        }

        let payload = decodedToken(access_token)
        if (!payload) {
            throw {name: 'JWSWebTokenError'}
        }

        let user = await User.findByPk(payload.id)
        if (!user) {
            throw {name: 'Unauthenticated'}
        }
        req.user = {
            id: user.id,
            username: user.username
        }
        next()

    } catch (err) {
        next(err)
    }
}

// async function autr (req, res, next) {
//     try {
        
//     } catch (err) {
//         next(err)
//     }
// }


module.exports = { auth }