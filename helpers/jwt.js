const jwt = require('jsonwebtoken')
const secret = "SecretNumber"

const createWebToken = (value) => jwt.sign(value,secret)
const convertToken = (token) => jwt.verify(token,secret)

module.exports = {createWebToken, convertToken}