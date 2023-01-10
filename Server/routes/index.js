const express = require('express')
const router = express.Router()
const axios = require('axios')
const genshin = require('genshin-api')

const {User, Favorite} = require('../models')
const {encryptPass, decryptPass} = require('../helper/bcrypt')
const {signToken, verifyToken} = require('../helper/jwt')

router.post('/register', async function(req, res, next){
    try {
        const {email, password} = req.body
        let bcryptPass = encryptPass(password)
        await User.create({email, password: bcryptPass})
        res.status(201).json({message: `New user created with email: ${email}`})
    } catch (err) {
        // if(err.name === )
        next(err)
    }
})

router.post('/login', async function(req, res, next){
    try {
        const {email, password} = req.body
        if(!email || !password) throw {name : 'EmailOrPasswordRequired'}

        let uLogin = await User.findOne({ where: {email} })
        if(!uLogin) throw {name : 'InvalidCredentials'}

        if(!decryptPass(password, uLogin.password)){
            throw {name : 'InvalidCredentials'}
        } else {
            let access_token = signToken({id: uLogin.id, email: uLogin.email})
            res.status(200).json({'access_token': access_token})
        }
    } catch (err) {
        next(err)
    }
})

router.post('/twitter-login', async function(req, res, next){
    try {
        
    } catch (err) {
        next(err)
    }
})

router.get('/characters', async function(req, res, next){
    try {
        let data = await genshin.Characters({id: 1})
        res.status(200).json(data)
    } catch (err) {
        next()
    }
})

router.get('/characters/:id', async function(req, res, next){
    try {
        
    } catch (err) {
        next(err)
    }
})

router.get('/favorites', async function(req, res, next){
    try {
        
    } catch (err) {
        next(err)
    }
})

router.post('/favorites/:id', async function(req, res, next){
    try {
        
    } catch (err) {
        next(err)
    }
})

module.exports = router