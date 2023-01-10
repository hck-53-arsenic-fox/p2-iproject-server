const { hashPassword } = require('../helpers/bcrypt')
const { verify } = require('../helpers/google-login')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models/index')



class UserController {
    
    static async loginGoogle(req, res, next) {
        try {
            let {google_token} = req.headers
            let password = hashPassword('passwordgoogle')
            const googleEmail = await verify(google_token)
            const [user, created] = await User.findOrCreate({
                where: { email: googleEmail },
                default: {
                    email: googleEmail,
                    password,
                    username: 'Google User'
                },
                hooks: false
            })
            let payload = { id: user.id }
            let w = 2
            let access_token = createToken(payload)
            res.status(200).json({
                access_token,
                email: user.email
            })
            

        } catch (err) {
            next(err)
        }
    }

}


module.exports = UserController