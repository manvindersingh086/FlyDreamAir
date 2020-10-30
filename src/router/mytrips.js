const express = require('express')
const Feedback = require('../models/Feedback')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const bodyparser = require('body-parser')
const User = require('../models/User')
const Trips = require('../models/trips')
const urlencodor =bodyparser.urlencoded({extended : true});
const flightInfo = require('../models/flightInformation');
var ObjectId = require('mongodb').ObjectID;

router.get('/myTrips',urlencodor,async (req,res) => {

    try{
       
    
        const email = req.query.email;
        const user = await User.findOne({email});
        const userId = user._id;
        const trips = await Trips.find({userId});
        const flightId = trips[0].flightId;
        const flights = await flightInfo.find({_id:ObjectId(flightId)});
    
        res.render('userTrips',{layout : '../layouts/index',flightId:flightId,email:email,trips:trips,flights:flights})
    }
    catch(e)
    {
        console.log(e);
    }

})

router.get('/inFlightServices',urlencodor, async (req,res) => {
    try{
        const flightId = req.query.flightId;
        console.log(flightId);
        const email = req.session.useremail;
        res.render('inFlightServices',{layout: '../layouts/index',flightId:flightId,email:email})
    }
    catch(e)
    {
        console.log(e);
    }
    
    //res.render('userTrips',{layout : '../layouts/index',trips:trips,flights:flights})
})

router.get('/eJournal',urlencodor, async (req,res) => {
    try
    {
        res.render('eJournal',{layout: '../layouts/index'})
    }
    catch(e)
    {
        console.log(e);
    }
})

router.get('/flightEntertainment',urlencodor, async (req,res) => {
    try
    {
        res.render('flightEntertainment',{layout: '../layouts/index'})
    }
    catch(e)
    {
        console.log(e);
    }
})

router.get('/mealOnBoard',urlencodor, async (req,res) => {
    try
    {
        res.render('mealOnBoard',{layout: '../layouts/index'})
    }
    catch(e)
    {
        console.log(e);
    }
})

module.exports = router;