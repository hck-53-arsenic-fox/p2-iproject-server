const express = require('express')
const router = express.Router()
const axios = require('axios')

// GENSHIN API
const genshin = require('genshin-api')  // BAD
const { EnkaClient, AssetsNotFoundError } = require('enka-network-api')
const enka = new EnkaClient()


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
        const characters = enka.getAllCharacters()
        // console.log(characters.map(c => c.skills));
        
        let data = characters.map(c => {
            return {id: c.id, name: c.name.get("en"), icon: c.icon.url}
        })
        res.status(200).json(data)

    } catch (err) {
        next()
    }
})

router.get('/characters/:id', async function(req, res, next){
    try {
        const {id} = req.params
        const oneChara = enka.getCharacterById(+id)

        let passiveSkills = (oneChara.passiveTalents.map(ele => {
            return {name: ele.name.get("en"), icon: ele.icon.url, description: ele.description.get("en")}
        }));
        
        let activeSkills = (oneChara.skills.map(ele => {
            return {icon: ele.icon.url, description: ele.description.get("en")}
        }));

        let detail = ({id: oneChara.id, name: oneChara.name.get("en"), image: oneChara.splashImage.url, talents: passiveSkills, skills: activeSkills})
        res.status(200).json(detail)
    } catch (err) {
        if(err.name === 'AssetsNotFoundError'){
            err.name = 'DataNotFound'
            next(err)
        }
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