const jwt = require('jsonwebtoken')
let secret = process.env.JWT_SECRET

function signToken(payload){
    return jwt.sign(payload, secret)
}

function verifyToken(payload){
    return jwt.verify(payload, secret)
}

module.exports = {signToken, verifyToken}