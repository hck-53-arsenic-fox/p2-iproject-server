const jwt = require('jsonwebtoken');

let secret = 'secret'

let createToken = (payload) => {
    return jwt.sign(payload, secret)
}

let decodedToken = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    createToken, decodedToken
}