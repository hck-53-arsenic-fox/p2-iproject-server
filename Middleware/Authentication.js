const {decodeToken}=require('../helper/index')
const { User} = require('../models/index')
async function authentication(req, res, next) {
    try {
        let acess_Token = req.headers.accesstoken
        console.log(acess_Token)
        if(!acess_Token){
            throw{name:'Unauthorized'}
        }
        let payload = decodeToken(acess_Token)
        let user = await User.findOne({
            where: {
                id: payload.id
            }
        })
        if (user) {
            req.User = {
                id:user.id,
                userName:user.userName
            }
            next()
        }
        else{
            throw{name:'Unauthorized'}
        }      
    } catch (error) {
        console.log(error)
        next(error)
    }
}


module.exports={authentication}