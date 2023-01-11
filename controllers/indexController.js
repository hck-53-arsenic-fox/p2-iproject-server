const bcrypt = require('bcryptjs');
const { signToken } = require('../helpers/jwt');
const { User, Log, Competition } = require('../models/index')
const midtransClient = require('midtrans-client');
const axios = require('axios');
const { Op } = require('sequelize');
const login = require('../helpers/google-login');
const { mailer } = require('../helpers/nodemailer');

class IndexController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body
            let data = await User.create({ username, email, password })
            res.status(201).json({ id: data.id, username: data.username, email: data.email, isSubscribed: data.isSubscribed })
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                res.status(400).json({ message: error.errors[0].message })
            } else if (error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: error.errors[0].message })
            } else {
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            if (!email) {
                throw { status: 400, message: 'Email cannot be empty' }
            }
            if (!password) {
                throw { status: 400, message: 'Password cannot be empty' }
            }
            let findUser = await User.findOne({ where: { email } })
            if (!findUser) {
                throw { status: 401, message: 'Invalid email/password' }
            }
            let isPassword = bcrypt.compareSync(password, findUser.password);
            if (!isPassword) {
                throw { status: 401, message: 'Invalid email/password' }
            }
            let payload = {
                id: findUser.id
            }
            let accessToken = signToken(payload)
            res.status(200).json({ access_token: accessToken })
        } catch (error) {
            console.log(error)
            if (error.status && error.message) {
                res.status(error.status).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    }

    static async profile(req, res) {
        try {
            let data = await User.findByPk(req.user.id)
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async subscription(req, res) {
        try {
            let data = await Log.create({ UserId: req.user.id, CompetitionId: req.body.competitionId })
            await Competition.decrement({ capacity: 1 }, { where: { id: req.body.competitionId } })
            let dataUser = await User.findByPk(req.user.id)
            mailer(dataUser.email)
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async generateMidtransToken(req, res) {
        try {
            let dataUser = await User.findByPk(req.user.id)
            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1000_000 + Math.random() * 9000_000), // unique
                    "gross_amount": 1000_000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": dataUser.email
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            res.status(201).json(midtransToken)
        } catch (error) {
            if (error.status && error.message) {
                res.status(error.status).json({ message: error.message })
            } else if (error.name === 'MidtransError') {
                res.status(400).json(err.ApiResponse.error_messages[0])
            } else {
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    }

    static async getAllFighters(req, res) {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `https://api.sportradar.us/mma/trial/v2/en/rankings.json?api_key=${process.env.SPORTRADAR_KEY}`
            })
            let obj = {}
            data.rankings.forEach((weightClass) => {
                obj[weightClass.name] = weightClass.competitor_rankings.map((el) => {
                    return { id: el.competitor.id, rank: el.rank, name: el.competitor.name }
                })
            })
            res.status(200).json(obj)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getFighterDetail(req, res) {
        try {
            const { id } = req.params
            const { data } = await axios({
                method: 'GET',
                url: `https://api.sportradar.us/mma/trial/v2/en/competitors/${id}/profile.json?api_key=${process.env.SPORTRADAR_KEY}`
            })
            if (!data) {
                throw { status: 404, message: 'Data not found' }
            }
            let obj = {}
            obj.id = data.competitor.id
            obj.name = data.competitor.name.split(',')
            obj.gender = data.competitor.gender
            obj.birthDate = data.info.birth_date
            obj.birthCountry = data.info.birth_country
            obj.win = data.record.wins
            obj.lose = data.record.losses
            obj.draw = data.record.draws
            obj.no_contest = data.record.no_contests
            obj.nickname = data.info.nickname
            obj.height = data.info.height
            obj.weight = data.info.weight
            obj.reach = data.info.reach
            res.status(200).json(obj)
        } catch (error) {
            if (error.status && error.message) {
                res.status(error.status).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error' })
            }
        }
    }

    static async getAllEvents(req, res) {
        try {
            const { page, search } = req.query
            let options = {}
            let limit
            let offset

            if (search) {
                options.where = {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }

            if (page) {
                let splitPage = page.split(',')
                if (splitPage[0]) {
                    limit = splitPage[0]
                    options.limit = limit
                }

                if (splitPage[1]) {
                    offset = splitPage[1] * limit - limit
                    options.offset = offset
                }
            } else {
                limit = 6;
                offset = 0;
                options.limit = limit;
                options.offset = offset;
            }

            let { count, rows } = await Competition.findAndCountAll(options)
            res.status(200).json({
                items: rows,
                totalPage: Math.ceil(count / limit)
            })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getAllLogsByUser(req, res) {
        try {
            let data = await Log.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getYoutubeVideo(req, res) {
        try {
            const { data } = await axios({
                method: 'GET',
                url: `https://youtube-v31.p.rapidapi.com/search?q=join-the-ufc-hall-of-fame&part=snippet,id&regionCode=US&maxResults=5&order=date`,
                headers: {
                    'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
                    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async loginGoogle(req, res) {
        try {
            const { google_token } = req.headers
            const data = await login(google_token)
            const [user, created] = await User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    username: data.username,
                    email: data.email,
                    password: "BebasDariGoogle",
                },
                hooks: false
            })

            let payload = {
                id: user.id
            }
            let access_token = signToken(payload)
            res.status(200).json({ access_token, email: user.email, id: user.id })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = IndexController