const express = require('express')
const Feedback = require('../models/Feedback')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const bodyparser = require('body-parser')
const urlencodor =bodyparser.urlencoded({extended : true});

router.get('/services',urlencodor,(req,res) => {
    res.render('services',{layout : '../layouts/index'})
})

router.get('/giftCards',urlencodor,(req,res) => {
    res.render('giftCards',{layout : '../layouts/index'})
})

module.exports = router;