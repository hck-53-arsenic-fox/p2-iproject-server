const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
class Controller {
    static async login( req, res ) {
        try {
            let { email, password } = req.body
            let login = await User.findOne({ where: { email }})
            let compare = bcrypt.compareSync( password, login.password )
            if( compare ) {
                res.status(200).json({ access_token: jwt.sign({login}, 'yorima_')})
            }
        } catch( err ) {
            console.log( err )
            res.status(500).json({ message:'internal server error'})
        }
    }
}

module.exports = Controller