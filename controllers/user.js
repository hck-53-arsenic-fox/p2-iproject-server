const { User } = require('../models')
const { hashing, compare } = require('../helpers/bcrypt')
const { createToken, verif } = require('../helpers/jwt')
const { send } = require('../helpers/mailer')
const midtransClient = require('midtrans-client');
const midtrans_server = 'SB-Mid-server-J3dzjIWb7s3SzCpfaZ85QWJR'

const axios = require('axios')
class Controller {

    static async anime( req, res ) {
        try {
            let data = await axios({
                methhod: 'GET',
                url: 'https://api.jikan.moe/v4/anime',
            })
            // console.log( data.data );
            res.status(200).json(data.data)
        } catch( err ) {
            console.log( err )
        }
    }

    static async register( req, res ) {
        try{
            let { name, email, password } = req.body
            if( !password ) {
                res.status(400).json({ message: 'Password is required'})
                return;
            }
            let regist = await User.create({ name, email, password: hashing( password, 10) })
            res.status(201).json(regist)
            send( email )
        }catch( err ) {
            console.log( err );
            let error = err.errors[0].message
            res.status(400).json({ message: error })
        }
    }

    static async login( req, res ) {
        try {
            let { email, password } = req.body
            if( !email ) {
                res.status(400).json({})
            }
            let login = await User.findOne({ where: { email }})
            let compareSync = compare( password, login.password )
            if( compareSync ) {
                res.status(200).json({ access_token: createToken({login}) })
            }
        } catch( err ) {
            console.log( err )
            let error = err.errors[0].message
            res.status(400).json({ message: error })
        }
    }
}

module.exports = Controller