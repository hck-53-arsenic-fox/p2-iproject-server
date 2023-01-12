const { decodeToken } = require('../helpers/jwt')
const { User, Resort } = require('../models')

// //? Modular Authentication
const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers
    if (!access_token) throw { name: "Invalid token" }

    let payload = decodeToken(access_token)

    let user = await User.findByPk(payload.id)

    if (!user) throw { name: "Invalid token" }

    req.user = { id: user.id }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication