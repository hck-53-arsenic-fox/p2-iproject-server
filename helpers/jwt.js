const jwt = require('jsonwebtoken');
const secret = 'bismillahphase3'

module.exports = {
    generateToken: (payload) => {
        return jwt.sign(payload, secret)
    },
    verifyToken: (token) => {
        return jwt.verify(token, secret)
    }
}