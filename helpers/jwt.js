const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

module.exports = {
    signToken:(payload) => {
        return jwt.sign(payload, secret)
    },
    decodeToken:(token) => {
        return jwt.verify(token, secret)
    }
}