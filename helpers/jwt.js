const jwt = require('jsonwebtoken');

const signToken = (payload) => {
    let token = jwt.sign(payload, process.env.SECRET);
    return token
}

const decodedToken = (token) => {
    let decoded = jwt.verify(token, process.env.SECRET);
    return decoded
}

module.exports = { signToken, decodedToken }