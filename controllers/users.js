
const { compareHash } = require('../helpers/bcryptjs');
const { signToken } = require('../helpers/jwt');
const {User} = require('../models/index');


class UserController {
    static async register(req, res){
        try {
            const {email, password} = req.body
            const user = await User.create({email, password, role: 'customer'})
            res.status(201).json({
                id: user.id,
                email: user.email
            })

        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                res.status(400).json({message: `${error.errors[0].message}`})
            } else if(error.name === ' SequelizeUniqueConstraintError'){
                res.status(400).json({message: `${error.errors[0].message}`})
            } else{
                res.status(500).json({message: `Internal server error`})
            }
        }
    }

    static async login(req, res){
        try {
            const {email, password} = req.body
            if(!email || !password){
                throw{
                    name: 'emailorpassnotfound'
                }
            }
            const dataUser = await User.findOne({where: {email}})
            if(!dataUser){
                throw{
                    name: 'invalidCredentials'
                }
            }
            const comparePass = compareHash(password, dataUser.password)
            if(!comparePass){
                throw{
                    name: 'invalidCredentials'
                }
            }

            const payload = {
                id: dataUser.id,
                email: dataUser.email,
                role: dataUser.role
            }

            const access_token = signToken(payload)
            res.status(200).json({access_token})
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                res.status(400).json({message: `${error.errors[0].message}`})
            } else if(error.name === 'invalidCredentials'){
                res.status(401).json({message: 'Invalid email/password'})
            } else{
                res.status(500).json({message: `Internal server error`})
            }
        }
    }
}

module.exports = UserController