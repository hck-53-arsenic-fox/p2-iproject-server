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

            const imgProfilePath = req.file.path 
            // console.log(imgProfile, '<----- imgpORIFLLQWE');
            const newUser = await User.create({
                username,
                email,
                password,
                imgProfile: imgProfilePath
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

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email) throw { name: 'Email is required' }
            if (!password) throw { name: 'Password is required' }

            const user = await User.findOne({ where: { email } })
            if (!user) throw { name: 'Invalid email/password' }
            if (!comparePassword(password, user.password)) throw { name: 'Invalid email/password' }

            const access_token = createToken({ id: user.id })
            console.log(access_token, '<---- akses token /login');

            res.status(200).json({ access_token })

        } catch (error) {
            console.log(error, '<---- error login');
            next(error)
        }
    }

    static async getUserProfile(req, res, next) {
        try {
            const findUser = await User.findOne(({
                attributes: { exclude: ['updatedAt'] },
                include: [
                    {
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                        model: Favorite,
                        include: [
                            {
                                attributes: { exclude: ['createdAt', 'updatedAt'] },
                                model: Player
                            }
                        ]
                    }
                ],
                where: { username: req.user.username },
            }))
            if (!findUser) throw { name: 'User not found' }

            res.status(200).json(findUser)

        } catch (error) {
            console.log(error, '<---- error getUserProfile')
            next(error);
        }
    }

    static async changeStatusPro(req, res, next) {
        try {
            const { username } = req.user
            const findUser = await User.findOne({ where: { username } })
            if (!findUser) throw { name: 'User not found' }

            const updatedData = await User.update({ status: 'Pro' }, {
                where: { username }
            })

            res.status(200).json({
                message: `Account with username ${username} upgraded to Pro Membership`
            })

        } catch (error) {
            console.log(error, '<----- error changeStatusPro');
            next(error)
        }
    }

    static async addFavoritePlayer(req, res, next) {
        try {
            const { PlayerId } = req.params
            const UserId = req.user.id
            if (!PlayerId) throw { name: 'Player not found' }
            if (!UserId) throw { name: 'User not found' }

            // const newFavorite = await Favorite.create({ UserId, PlayerId })
            // const [user, created] = await Users.findOrCreate({
            //     where: { firstName: "Jane" },
            //     defaults: { lastName: "Doe" },
            // });

            res.status(201).json(newFavorite)
        } catch (error) {
            console.log(error, '<----- error addFavoritePlayer');
            next(error)
        }
    }

}

module.exports = UserController