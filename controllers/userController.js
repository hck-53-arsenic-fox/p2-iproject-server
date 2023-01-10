const { hashPassword } = require('../helpers/bcrypt')
const { verify } = require('../helpers/google-login')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models/index')



class UserController {
    
    static async loginGoogle(req, res, next) {
        try {
            let {google_token} = req.headers
            let pass = hashPassword('passwordgoogle')
            const googleEmail = await verify(google_token)
            console.log(googleEmail, '<<< hasil VERIFY');
            const [user, created] = await User.findOrCreate({
                where: { email: googleEmail },
                defaults: {
                    email: googleEmail,
                    password: pass,
                    username: 'Google User'
                },
                hooks: false
            })

            let payload = { id: user.id }
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