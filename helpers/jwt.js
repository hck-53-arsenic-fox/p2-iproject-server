const jwt = require('jsonwebtoken')
let secret = 'secretrtz'

module.exports ={
    createToken: (payload) =>{
        return jwt.sign(payload, secret)
    },
    decodeToken:(token) =>{
        return jwt.verify(token, secret)
    }
}

