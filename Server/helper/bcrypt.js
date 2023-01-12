const bcrypt = require('bcrypt')

function encryptPass(password){
    return bcrypt.hashSync(password, 8)
}

function decryptPass(password, userPass){
    return bcrypt.compareSync(password, userPass)
}

module.exports = {encryptPass, decryptPass}