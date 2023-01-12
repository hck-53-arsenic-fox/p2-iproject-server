const {decodedToken} = require('../helpers/jsonwebtoken');
const {User} = require('../models/index');
async function Authentication (req , res , next){

    try {

        let {access_token} = req.headers 
        
        let payload = decodedToken(access_token) 

        let user = await User.findByPk(payload.id) 
        
        if(user){
            req.user = {id: user.id, name: user.name, email: user.email}
            next();

        }else{
            throw {name: 'Unauthentication'}
        }

    } catch (error) {
        next(error)
    }

}

module.exports = {Authentication}