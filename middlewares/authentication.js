const { decodedToken } = require('../helpers/jwt')
const { User } = require('../models/index')

const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token

    if (!access_token) {
      throw { name: 'Unauthenticated' }
    }
    // console.log(access_token, '<< token authen');
    let payload = decodedToken(access_token)
    let user = await User.findOne({
      where: {
        id: payload.id
      }
    })

    if (!user) {
      throw { name: 'Unauthenticated' }
    }

    req.user = {
      id: user.id
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authentication;