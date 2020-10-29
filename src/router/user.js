const express = require('express')
const User = require('../models/User')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const bodyparser = require('body-parser')
const {sendWelcomeEmail,sendGoodByeMail} = require('../Emails/accounts')

const urlencodor =bodyparser.urlencoded({extended : true});

router.post('/user',urlencodor,[
     check('email','Invalid email id').isEmail(),
     check('password','Invalid password').isLength({min : 4})
],async (req,res) => {
     try
     {
          const errors = validationResult(req);
          if (!errors.isEmpty()) 
          {
               res.render('SignUp',{layout : '../layouts/index',success:false,errors:errors.array()})
          }
          const user = new User();
          user.name = req.body.name;
          user.email = req.body.email;
          user.password = req.body.password;
          //sendWelcomeEmail(req.body.email,req.body.name);
          user.save()
          const token= await user.generateToken();
          res.session.success = true;
          //console.log(token)  
     }
     catch(e)
     {
          res.status(400).send(e)
     }
});

router.post('/userLogin',urlencodor,async (req,res) => {
     try
     {
          const user = await User.findUserByCredentials(req.body.email,req.body.password)
          const token = await user.generateToken()
          res.render('userHome',{layout : '../layouts/index',email:req.body.email,tokens:user.tokens,token:token})
     }
     catch(e)
     {
          res.status(400).send(e)  
     }
});

router.get('/userProfile',auth,urlencodor,async (req,res) => {
     try
     {
          
          const user = await User.findUserByCredentials(req.query.email,undefined)
          console.log(user)
          res.render('userProfile',{layout : '../layouts/index',email:req.query.email})
     }
     catch(e)
     {
          res.status(400).send(e)  
     }
});



router.post('/logout',urlencodor,async (req,res) => {
     
    console.log("Hiii")
})
module.exports = router;