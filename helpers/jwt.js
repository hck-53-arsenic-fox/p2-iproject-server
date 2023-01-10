const jwt = require('jsonwebtoken')

const SECRET = "rahasiaperusahaan"

module.exports ={
    createToken:(payload)=> jwt.sign(payload,SECRET),
    verifyToken:(token)=> jwt.verify(token,SECRET)
}