const { decodeToken } = require('../helpers/jwt')
const{ User }= require('../models/index')

async function authentication(req,res,next){
    try {
        const access_token = req.headers.access_token
        if(!access_token){
            throw{
                name: 'Unauthenticated'
            }
        }
        const payload = decodeToken(access_token)
        const user = await User.findByPk(payload.id)
        if(user){
            req.user ={
                id:user.id,
                email:user.email,
                role:user.role
            }
            next()
        } else{
            throw{
                name: 'Unauthenticated'
            }
        }
    } catch (error) {
        if(error.name === 'Unauthenticated'){
            res.status(401).json({message: 'Invalid Token'})
        } else if(error.name === 'JsonWebTokenError'){
            res.status(401).json({message: 'Invalid Token'})
        } else {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}

module.exports = {authentication}