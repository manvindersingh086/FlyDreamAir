const express = require('express')
const Feedback = require('../models/Feedback')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const bodyparser = require('body-parser')
const urlencodor =bodyparser.urlencoded({extended : true});

router.post('/feedback',urlencodor,async (req,res) => {
    console.log(req.query.name);
    console.log(req.query.email);
    console.log(req.query.feedbacktype);
})

module.exports = router;