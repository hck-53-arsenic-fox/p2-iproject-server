const jwt = require('jsonwebtoken')
module.exports = {
    createToken: ( pay ) => jwt.sign(pay, 'yorima_'),
    verif: ( pay ) => jwt.verify(pay, 'yorima_')
}