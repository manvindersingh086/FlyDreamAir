const express = require('express')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const bodyparser = require('body-parser')
const urlencodor =bodyparser.urlencoded({extended : true});

router.get('/offers',urlencodor,(req,res) => {
    res.render('offers',{layout : '../layouts/index'})
})

module.exports = router

