const bcrypt = require('bcrypt')
module.exports = {
    hashing: ( hash ) => bcrypt.hashSync( hash, 10 ),
    compare: ( pass, hash ) => bcrypt.compareSync( pass, hash )
}