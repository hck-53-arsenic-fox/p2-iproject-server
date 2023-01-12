const bcrypt = require("bcryptjs")

const hashPassword = ((password)=>{
    const hash = bcrypt.hashSync(password, 8)
    return hash
})
const compareHash = ((password, hashPass)=>{
    const compare = bcrypt.compareSync(password, hashPass)
    return compare
})

module.exports = {hashPassword, compareHash}