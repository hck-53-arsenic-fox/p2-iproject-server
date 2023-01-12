const jwt = require('jsonwebtoken')

const createToken = (payload) => jwt.sign(payload, 'duarrrrr')
const verifyToken = (token) => jwt.verify(token, 'duarrrrr')

module.exports = { createToken, verifyToken }

