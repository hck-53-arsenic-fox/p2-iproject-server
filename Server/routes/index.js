const express = require('express')
const router = express.Router()
const axios = require('axios')

// TWITTER API
const {oauth} = require('oauth')
const LoginWithTwitter = require('login-with-twitter')

const tw = new LoginWithTwitter({
    consumerKey: 'abc',
    consumerSecret: 'abc',
    callbackUrl: 'abc',
})

// GENSHIN API
const { EnkaClient, AssetsNotFoundError, UserNotFoundError } = require('enka-network-api')
const enka = new EnkaClient()
const genshin = require('genshin-api')

// HELPER & MIDDLEWARE -- + NODEMAILER FOR VERIFICATION
const {User, Favorite} = require('../models')
const {encryptPass, decryptPass} = require('../helper/bcrypt')
const {signToken, verifyToken} = require('../helper/jwt')
const {authentication, authorization} = require('../middleware/auth')
const {verification} = require('../helper/nodemailer')

// GOOGLE LOGIN
const {OAuth2Client} = require('google-auth-library')


// CHANGE TO DEPLOYED CLIENT LINK
let url = 'http://localhost:3000'    

// REGISTER/LOGIN
router.post('/register', async function(req, res, next){
    try {
        const {email, password} = req.body
        let bcryptPass = encryptPass(password)
        await User.create({email, password: bcryptPass})

        verification(email, url + `/verify?id=${signToken({email})}`)
        res.status(201).json({message: `New user created`, link: url + `/verify/${signToken({email})}`})
    } catch (err) {
        next(err)
    }
})

router.patch('/verify', async function(req, res, next){
    try {
        const {id} = req.query
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
router.get('/twitter', async function(req, res, next){
    tw.login((err, tokenSecret, url) => {
        if(err){
            console.log(err);
        }

        req.session.tokenSecret = tokenSecret

        res.redirect(url)
    })
})

router.get('/twitter/callback', (req, res, next) => {
    tw.callback({
        oauth_token: req.query.oauth_token,
        oauth_verifier: req.query.oauth_verifier
    }, req.session.tokenSecret, (err, user) => {
        if(err) {

        }

        delete req.session.tokenSecret
        req.session.user = user
        res.redirect('/')
    })
})

// GOOGLE LOGIN -- 
router.post('/google-login', async function(req, res, next){
    try{
        const CLIENT_ID = process.env.CLIENT_ID
        const client = new OAuth2Client(CLIENT_ID);     
        // console.log(client)
          const ticket = await client.verifyIdToken({   // decrypt
              idToken: req.headers.google_token,
              audience: CLIENT_ID,  
              // Specify the CLIENT_ID of the app that accesses the backend
              // Or, if multiple clients access the backend:
              //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
          });
          // If request specified a G Suite domain:
          // const domain = payload['hd'];
        
        const { email } = ticket.getPayload();          
        const [user] = await User.findOrCreate({        // Sequelize function (findOrCreate)
            where: {email},                             // find User.email
            defaults: {                                 // !User.email, create;
                email: email,
                password: 'default',
                status: 'Active'
            },
            hooks: false                                // Disable Hooks
        })                                              // ALWAYS REGISTER..    
        let payload = {                                 // Create payload for access_token
            id : user.id,
            email : user.email
        }
        let access_token = signToken(payload)       
        res.status(200).json({access_token})            
        }
        catch(err){
            console.log(err);
        next(err)
    }
})

// GENSHIN
router.get('/characters', async function(req, res, next){
    try {
        const characters = enka.getAllCharacters()
        // console.log(characters.map(c => c.rarity));
        
        let data = characters.map(c => {
            return {id: c.id, name: c.name.get("en"), element: c.element.id, icon: c.icon.url}
        })
        res.status(200).json(data)

    } catch (err) {
        next()
    }
})

// router.get('/characters/:name', async function(req, res, next){
//     try {
//         const {name} = req.params
//         console.log(name);
//         const data = await genshin.Characters(name)
//         res.status(200).json(data)
//     } catch (err) {
//         next()
//     }
// })

router.get('/characters/:id', async function(req, res, next){
    try {
        const {id} = req.params
        const oneChara = enka.getCharacterById(+id)

        let passiveSkills = (oneChara.passiveTalents.map(ele => {
            return {name: ele.name.get("en"), icon: ele.icon.url, description: ele.description.get("en")}
            // return {name: ele.description.get("en")}
        }));
        
        let activeSkills = (oneChara.skills.map(ele => {
            return {name: ele.name.get("en"), icon: ele.icon.url, description: ele.description.get("en")}
        }));

        let detail = ({name: oneChara.name.get("en"), rarity: oneChara.rarity, description: oneChara.description.get("en"),image: oneChara.splashImage.url, talents: passiveSkills, skills: activeSkills})

        res.status(200).json(detail)
    } catch (err) {
        if(err.name === 'AssetsNotFoundError'){
            err.name = 'DataNotFound'
            next(err)
        }
        next(err)
    }
})

router.get('/weapons', async function(req, res, next){
    try {
        const data = await genshin.Weapons()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/weapons/:name', async function(req, res, next){
    try {
        let {name} = req.params
        const data = await genshin.Weapons(`${name}`)
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
})

router.get('/account', authentication, authorization, async function(req, res, next){
    let {uid} = req.query
    try {
        let acc = await enka.fetchUser(+uid)

        res.status(200).json({
            PP: acc.profilePictureCharacter.icon.url, 
            splashImg: acc.profilePictureCharacter.splashImage.url, 
            Namecard: acc.profileCard.icon.url, 
            Name: acc.nickname, 
            Level: acc.level, 
            WL: acc.worldLevel, 
            Achievements: acc.achievements
        });
                
    } catch (err) {
        res.status(404).json({message: `User with UID ${uid} was not found`})
    }
})



module.exports = router