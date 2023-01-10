
const { compareHash } = require('../helpers/bcryptjs');
const { signToken } = require('../helpers/jwt');
const {User} = require('../models/index');
const { OAuth2Client } = require("google-auth-library");


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
            } else if(error.name === 'SequelizeUniqueConstraintError'){
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

    static async loginGoogle(req, res, next) {
        try {
          const CLIENT_ID = process.env.CLIENT_ID;
          const client = new OAuth2Client(CLIENT_ID);
    
          const ticket = await client.verifyIdToken({
            idToken: req.headers.google_token,
    
            audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
          });
          
          // console.log(ticket);
          const {email} = ticket.getPayload();
          // const userid = payload['sub'];
          // If request specified a G Suite domain:
          // const domain =payload['hd'];
      
          const user = await User.findOrCreate({
            where:{email},
            defaults:{
                email,
                password: 'rahasia',
                role:'customer'
            },
            hooks: false
          }) 
     
          let payload = {
            id: user[0].id,
            role: user[0].role
          };
          let access_token = signToken(payload);
          res.status(200).json({access_token});
        } catch (err) {
            console.log(err);
          next(err);
        }
      }
}

module.exports = UserController