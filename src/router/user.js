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

router.post('/flightBooking',urlencodor,[
          check('fromCity').custom((value, {req}) => {
               if(value == req.body.toCity)
               {
                    throw new Error('FromCity and ToCity cannot be same.')
               }
               else
               {
                    throw new Error();
               }

          }),
          check('departureDate').custom((value,{req}) => {
                    if(value == req.body.returnDate)
                    {
                         throw new Error('Departure Date and return date cannot be same.')
                    }
                    else
                    {
                         throw new Error();
                    }
          })
],async (req,res) => {

     const errors = validationResult(req);
     if (!errors.isEmpty()) 
     {
         res.render('flightBooking',{layout : '../layouts/index',success:false,errors:errors.array()})
          //console.log(errors.array()[0].msg);
     }
     else
     {
          res.render('SignUp',{layout : '../layouts/index',success:true})
     }
     
});

router.post('/logout',urlencodor,async (req,res) => {
     
     // req.user.tokens = req.query.tokens.filter((token) => {
     //     console.log(token)
     //  })
     // for (var i = 0; i < req.query.tokens.length; i++) {
     //      console.log(req.query.tokens[i]);
     //      //Do something
     //  }
         
     //  req.query.tokens..filter((token) => {
     //      console.log(token)
     //   })
          
          // req.query.tokens.forEach((token) => {
          //      console.log(token)
          //  })
          //  for (var i = 0; i < req.query.tokens.length; i++) {
          //      if(req.query.tokens[i] != req.query.token)
          //      {
          //           console.log(req.query.tokens[i])
          //           req.user.tokens=  req.query.tokens[i];
          //      }
          //      //Do something
          //  }
          
})
module.exports = router;