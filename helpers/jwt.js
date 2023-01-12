const jwt = require('jsonwebtoken');

const signToken = (payload) => {
    let token = jwt.sign(payload, process.env.SECRET_KEY);
    return token
}

const decodedToken = (token) => {
    let decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded
}

module.exports = { signToken, decodedToken }