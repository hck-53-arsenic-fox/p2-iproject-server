const bcrypt = require('bcryptjs')

const hashPassword = (password) =>bcrypt.hashSync(password, 10)
const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}


module.exports = {hashPassword, compareHash}