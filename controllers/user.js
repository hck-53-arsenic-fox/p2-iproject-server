const { User } = require('../models')
const { hashing, compare } = require('../helpers/bcrypt')
const { createToken, verif } = require('../helpers/jwt')
const midtransClient = require('midtrans-client');
const { send } = require('../helpers/mailer')
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
            // let error = err.errors[0].message
            // res.status(400).json({message:error})
        }
    }

    static async register( req, res ) {
        try{
            let { name, email, password } = req.body
            console.log(name, email, password);
            if( !password ) {
                res.status(400).json({ message: 'Password is required'})
                return;
            }
            let regist = await User.create({ name, email, password: hashing( password, 10) })
            res.status(201).json({
                id: regist.id,
                name: regist.name,
                email: regist.email
            })
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
            console.log( req.body )
            if( !email ) {
                res.status(400).json({ message: `Email is required`})
                return;
            }
            if( !password ) {
                res.status(400).json({ message: `Password is required`})
                return;
            }
            let login = await User.findOne({ where: { email }})
            // console.log(password, "<<<<<");
            if (!login) {
                res.status(400).json({ message:`Invalid email/password`})
                return;
            }

            let compareSync = compare(password, login.password)
            if( compareSync ) {
                res.status(200).json({ access_token: createToken({login}) })
            }
        } catch( err ) {
            console.log( err )
            // let error = err.errors[0].message
            res.status(400).json({ message: err })
        }
    }

    static async midtrans( req, res ) {
        try {
            let { name, email } = req.body
            
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : 'SB-Mid-server-J3dzjIWb7s3SzCpfaZ85QWJR'
            });
            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.random(),
                    "gross_amount": 10000000
                },
                "credit_card":{
                    "secure" : true
                },
                "customer_details": {
                    "first_name": name,
                    // "last_name": "pratama",
                    "email": email,
                    // "phone": "08111222333"
                }
            };
    
            let midtransToken = await snap.createTransaction(parameter)
            res.status(200).json(midtransToken)
        } catch( err ) {
            console.log( err.ApiResponse.error_message[0] );
            let error = err.ApiResponse.error_message[0]
            res.status(400).json( { message:error } )
        }
    }
}

module.exports = Controller