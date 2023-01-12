const { User } = require('../models/index')
const { decodedToken } = require("../helpers/jwt")

const isLogin = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        if (!access_token) {
            throw { status: 401, message: 'Invalid token' }
        }
        let decoded = decodedToken(access_token)
        if (!decoded) {
            throw { name: 'JsonWebTokenError' }
        }
        let dataUser = await User.findByPk(decoded.id)
        req.user = {
            id: dataUser.id,
            email: dataUser.email,
            username: dataUser.username
        }
        next()
    } catch (error) {
        if (error.status && error.message) {
            res.status(error.status).json({ message: error.message })
        } else if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: 'Invalid token' })
        } else {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = { isLogin }