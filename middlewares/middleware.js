const { decodeToken } = require("../helpers/jwt")
const { Favorite, Movie, User } = require('../models')

async function authentication(req, response, next) {
    try {
        let acces_token = req.headers.acces_token
        if (!acces_token) {
            throw { name: "unautheticated" }
        }
        let payload = decodeToken(acces_token)
        let user = await User.findByPk(payload.id)

        if (user) {
            req.user = { id: user.id, email: user.email, status:user.status }
            next()
        } else {
            throw { name: "unautheticated" }
        }
    } catch (error) {
        if (error.name === "unautheticated") {
            response.status(401).json({ message: "unautheticated" })
        } else {
            response.status(500).json({ message: "internal server error" })
        }
    }

}

async function authorization(req, response, next) {
    try {
        let movie = await Movie.findByPk(req.params.id)
        if (!movie) {
            throw { name: "NotFound" }
        } else {
            let status = req.user.status
            if (status !== "Premium") {
                throw { name: "ForbiddenAccess" }
            } else {
                next()
            }
        }
    } catch (error) {
        if (error.name === "NotFound") {
            response.status(404).json({ message: " Data not Found" })
        } else if (error.name === "ForbiddenAccess") {
            response.status(403).json({ message: "Forbidden Acces" })
        } else {
            response.status(500).json({ message: "internal server error" })
        }
    }
}

module.exports={authentication,authorization}