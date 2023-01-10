const { User, Player, Favorite } = require('../models')
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const verify = require("../helpers/google");
const sendEmail = require('../helpers/nodemailer')
// const midtransClient = require('midtrans-client');

class UserController {
    static async register(req, res, next) {
        try {
            const { email, username, password } = req.body
            if (!email) throw { name: 'Email is required' }
            if (!username) throw { name: 'Username is required' }
            if (!password) throw { name: 'Password is required' }

            // const imgProfile = req.file.path 
            // console.log(imgProfile, '<----- imgpORIFLLQWE');
            const newUser = await User.create({
                username,
                email,
                password,
            })

            res.status(201).json({
                message: 'Your account has been created!',
                data: {
                    id: newUser.id,
                    username: username,
                    email: email
                }
            })
        } catch (error) {
            console.log(error, '<---- error register');
            next(error)
        }
    }
}

module.exports = UserController