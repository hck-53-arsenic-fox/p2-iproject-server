const {User} = require('../models')

class Controller {
static async handleRegister(req,res,next){
    try {
        const {email, password, name} = req.body
        const dataUser = await User.create({email, password, name})
        res.status(201).json({id:dataUser.id, email: dataUser.email})
    } catch (error) {
        console.log(error)
        
    }
}


}

module.exports = Controller