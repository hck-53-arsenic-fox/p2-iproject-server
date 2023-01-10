const express = require('express')
const router = express.Router()
const axios = require('axios')

// TWITTER API

// GENSHIN API
const genshin = require('genshin-api')  // BAD
const { EnkaClient, AssetsNotFoundError } = require('enka-network-api')
const enka = new EnkaClient()

// HELPER & MIDDLEWARE
const {User, Favorite} = require('../models')
const {encryptPass, decryptPass} = require('../helper/bcrypt')
const {signToken, verifyToken} = require('../helper/jwt')
const {authentication, authorization} = require('../middleware/auth')
const {verification} = require('../helper/nodemailer')

let url = 'http://localhost:3000'

router.post('/register', async function(req, res, next){
    try {
        const {email, password} = req.body
        let bcryptPass = encryptPass(password)
        await User.create({email, password: bcryptPass})

        verification(email, url + `/verify/${signToken({email})}`)
        res.status(201).json({message: `New user created`, link: url + `/verify/${signToken({email})}`})
    } catch (err) {
        next(err)
    }
})

router.patch('/verify/:id', async function(req, res, next){
    try {
        const {id} = req.params
        let email = verifyToken(id)
        console.log(email.email);
        let nUser = await User.findOne({ where: {email: email.email} })
        
        if(nUser){
            await User.update({ status: 'Active' }, {where: {id: nUser.id}})
        } else {
            throw {name: 'DataNotFound'}
        }

        res.status(200).json({ message: 'Account is now Active'})

    } catch (err) {
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

// TWITTER OAUTH --
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

router.get('/favorites', authentication, async function(req, res, next){
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