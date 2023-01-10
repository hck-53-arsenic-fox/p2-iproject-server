const { compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Favorite, Movie, User } = require('../models')

class controllerUser{
    static async register(req, response) {
        try {
            let { username, email, password } = req.body
            if(!email){
                throw{name:"Email is required"}
            }
            if(!password){
                throw{name:"Password is required"}
            }
            if(!username){
                throw{name:'Username is required'}
            }
            let data = await User.create({ username, email, password })
            response.status(201).json({ id: data.id, email: data.email, username:data.username })
        } catch (error) {
            if(error.name === 'Email is required'){
                response.status(400).json({message:'Email is required'})
            }else if(error.name === 'Password is required'){
                response.status(400).json({message:'Password is required'})
            }else if(error.name === "Username is required"){
                response.status(400).json({message:'Username is required'})
            }else{
                response.status(500).json({message:'Internal Server Error'})
            }
        }
    }
    static async login(req,response){
        try {
            let { email, password } = req.body
            if (!email) {
                throw { name: 'EmailRequired' }
            }
            if(!password){
                throw{name:'PasswordRequired'}
            }
            let user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: 'Invalid email/password' }
            }
            let compared = compareHash(password, user.password)
            if (!compared) throw { name: 'Invalid email/password' }
            let payload = {
                id: user.id
            }
            let acces_token = createToken(payload)
            response.status(200).json({ acces_token })
        } catch (error) {
            if(error.name==="EmailRequired"){
                response.status(400).json({message:'Email is Required'})
            }else if(error.name === "PasswordRequired"){
                response.status(400).json({message:'Password is Required'})
            }else if(error.name==='Invalid email/password'){
                response.status(401).json({message:'Invalid email/password'})
            }else{
                response.status(500).json({message:"Internal Server Error"})
            }
        }
    }
}
module.exports=controllerUser