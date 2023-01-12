const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

function comparePassword(passwordBody, passwordDataBase) {
    return bcrypt.compareSync(passwordBody, passwordDataBase)
}

function signToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY)
}

function decodeToken(token){
    return jwt.verify(token, process.env.SECRET_KEY)
} 


module.exports = { hashPassword, comparePassword,signToken,decodeToken }