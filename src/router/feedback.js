const express = require('express')
const Feedback = require('../models/Feedback')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const bodyparser = require('body-parser')
const urlencodor =bodyparser.urlencoded({extended : true});

router.post('/feedback',urlencodor,async (req,res) => {
    
    try
    {
        const feedback = new Feedback();
        feedback.name = req.body.name;
        feedback.email = req.body.email;
        feedback.type = req.body.feedbacktype;
        feedback.comments = req.body.comment;
        feedback.save();
    }
    catch(e)
    {
        console.log(e);
    }
   
})

module.exports = router;