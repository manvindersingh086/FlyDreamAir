const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    res.render('home',{layout : '../layouts/index'})
});

//sets a basic route
router.get('/login',(req,res) => {
    res.render('login',{layout : '../layouts/index'})
});

router.get('/SignUp',(req,res) => {
    res.render('SignUp',{layout : '../layouts/index'})
});

router.get('/flightBooking',(req,res) => {
    res.render('flightBooking',{layout : '../layouts/index'})
});

router.get('/feedback',(req,res) => {
    res.render('Feedback',{layout : '../layouts/index'})
});

module.exports=router;