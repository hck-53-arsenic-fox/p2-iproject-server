var jwt = require('jsonwebtoken');
var secret = 'INISECRETTOKEN'

function createToken(value){
    return jwt.sign(value , secret)
}

function decodedToken(value){
    return jwt.verify(value, secret);
}

module.exports = {createToken , decodedToken}