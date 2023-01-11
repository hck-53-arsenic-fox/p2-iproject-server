const { User, Player, Favorite } = require('../models')
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const verify = require("../helpers/google");
const sendEmail = require('../helpers/nodemailer')
const midtransClient = require('midtrans-client');

class UserController {
    static async register(req, res, next) {
        try {
            const { email, username, password } = req.body
            if (!email) throw { name: 'Email is required' }
            if (!username) throw { name: 'Username is required' }
            if (!password) throw { name: 'Password is required' }

            const imgProfilePath = req.file.path
            // console.log(req.file, '<----- REQ.FILE');
            // console.log(imgProfilePath, '<----- imgpORIFLLQWE');

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

            res.status(200).json({ username: user.username, access_token })

        } catch (error) {
            console.log(error, '<---- error login');
            next(error)
        }
    }

    static async getUserProfile(req, res, next) {
        try {
            const { access_token } = req.headers
            if (!access_token) throw { name: 'Invalid token' }

            const findUser = await User.findOne(({
                attributes: { exclude: ['updatedAt', 'password'] },
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
            const { access_token } = req.headers
            if (!access_token) throw { name: 'Invalid token' }

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
            const { access_token } = req.headers
            if (!access_token) throw { name: 'Invalid token' }

            const { PlayerId } = req.params
            const UserId = req.user.id
            if (!PlayerId) throw { name: 'Player not found' }
            if (!UserId) throw { name: 'User not found' }

            // const newFavorite = await Favorite.create({ UserId, PlayerId })
            const [user, created] = await Favorite.findOrCreate({
                where: { PlayerId, UserId },
                defaults: {
                    UserId,
                    PlayerId
                },
            });

            if (!created) throw { name: 'This player already in your favorite list' }

            // console.log(user, '<---- ini user');
            // console.log(created, '<---- ini created');

            res.status(201).json(created)
        } catch (error) {
            console.log(error, '<----- error addFavoritePlayer');
            next(error)
        }
    }

    static async getAllFavorites(req, res, next) {
        try {
            const { access_token } = req.headers
            if (!access_token) throw { name: 'Invalid token' }

            const { username } = req.user;
            const findUser = await User.findOne({ where: { username } })
            if (!findUser) throw { name: 'User not found' }

            const dataFavorite = await Favorite.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: { UserId: findUser.id },
                include: {
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    model: Player
                }
            })

            res.status(200).json(dataFavorite)

        } catch (error) {
            console.log(error, '<------ error getAllFavorites');
            next(error)
        }
    }

    static async midtransToken(req, res, next) {
        try {
            const user = await User.findByPk(req.user.id)
            if (user.status == 'Pro') {
                throw { name: 'You already in Pro membership' }
            }

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: 'SB-Mid-server-W29scbawv8BmrIdy1eRssT3M'
            });

            let parameter = {
                transaction_details: {
                    order_id: "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
                    gross_amount: 149000
                },
                credit_card: {
                    "secure": true
                },
                customer_details: {
                    email: user.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            // console.log(midtransToken, '<---- midtransToken');
            res.status(200).json(midtransToken);


        } catch (error) {
            console.log(error, '<---- error midtrans');
            next(error)

        } 
    }

}

module.exports = UserController


// {
//     include: {
//         model: Favorite,
//     },
//     where: { username }
// }