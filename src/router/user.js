const express = require('express')
const User = require('../models/User')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const bodyparser = require('body-parser')
const {sendWelcomeEmail,sendGoodByeMail} = require('../Emails/accounts')
const ObjectId = require('mongodb').ObjectID
const swal = require('sweetalert');

const urlencodor =bodyparser.urlencoded({extended : true});

router.post('/user',urlencodor,async (req,res) => {
     try
     {
          const user = new User();
          user.name = req.body.username;
          user.email = req.body.email;
          user.password = req.body.password;
          
          //sendWelcomeEmail(req.body.email,req.body.name);
          await user.save()
          const token= await user.generateToken();
          res.render('successSignUp',{layout : '../layouts/index',email:req.body.email,tokens:user.tokens,token:token})
          
     }
     catch(e)
     {
         console.log(e);
         res.render('errorSignUp',{layout : '../layouts/index'})
     }

     
});

router.post('/userLogin',urlencodor,async (req,res) => {
     try
     {
          req.session.useremail= req.body.email;
          console.log(req.body.email);
          console.log(req.body.password);
          const user = await User.findUserByCredentials(req.body.email,req.body.password)
          const token = await user.generateToken()
          
          res.render('userHome',{layout : '../layouts/index',email:req.body.email,tokens:user.tokens,token:token,username:user.name})
     }
     catch(e)
     {
          res.render('errorLogin',{layout : '../layouts/index'})
     }
});

router.get('/userProfile',urlencodor,async (req,res) => {
     try
     {
          
          const user = await User.findUserByCredentials(req.query.email,undefined)
          res.render('userProfile',{layout : '../layouts/index',email:req.query.email,userId:user._id})
     }
     catch(e)
     {
          res.status(400).send(e)  
     }
});

router.post('/userUpdate',urlencodor, async (req,res) => {
     try
     {
          console.log(req.query.userId)
          const user = await User.updateOne({_id :ObjectId(req.query.userId)},{$set: {email: req.body.email}});
          res.render('userHome',{layout : '../layouts/index'});
     }
     catch(e)
     {
          res.status(400).send(e);
     }
});

router.get('/userHome',urlencodor, async (req,res) => {
     res.render('userHome',{layout : '../layouts/index'});
})

router.post('/logout',urlencodor,async (req,res) => {
     
     res.render('logout',{layout : '../layouts/index'});
})
module.exports = router;