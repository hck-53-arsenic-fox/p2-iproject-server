const express = require('express')
const router = express.Router()
const axios = require('axios')
const genshin = require('genshin-api')

const {User, Favorite} = require('../models')

router.post('/register', async function(req, res, next){
    try {
        
    } catch (err) {
        next()
    }
})

router.post('/login', async function(req, res, next){
    try {
        
    } catch (err) {
        next()
    }
})

router.get('/', async function(req, res, next){
    try {
        
    } catch (err) {
        next()
    }
})

module.exports = router