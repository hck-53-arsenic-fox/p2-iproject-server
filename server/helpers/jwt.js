const jwt = require("jsonwebtoken")
const secret = "rahasia"

const signToken = ((payload)=>{
    const create = jwt.sign(payload, secret)
    return create
})
const verifyToken = ((payload)=>{
    const verify = jwt.verify(payload, secret)
    return verify
})

module.exports = {signToken, verifyToken}