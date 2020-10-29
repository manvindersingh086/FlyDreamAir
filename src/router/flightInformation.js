const express = require('express')
const flightInfo = require('../models/flightInformation')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const bodyparser = require('body-parser')
var ObjectId = require('mongodb').ObjectID
const urlencodor =bodyparser.urlencoded({extended : true})
const session = require('express-session')
const {request}= require('http')


router.post('/flightBooking',urlencodor,async (req,res) => {
            try{
                const flightType =  req.body.flightType;
                const origin = req.body.fromCity;
                const destination = req.body.toCity;
                query = {flightType:flightType,origin:origin,destination:destination};
                const flights = await flightInfo.find(query).limit(5)
                res.render('flightDetails',{layout : '../layouts/index',flights:flights})
               }
            catch(e)
            {
                console.log(e)
            }
});

router.post('/flightReview',urlencodor, async (req,res) => {
            try{
               
                const flights = await flightInfo.find({_id:ObjectId(req.query.flightId)})
                res.render('flightReview',{layout : '../layouts/index',flights:flights,flightId:req.query.flightId})
             
            }
            catch(e)
            {
                console.log(e)
            }
});

router.post('/flightTravellerDetails',urlencodor, async (req,res) => {
    try{
       
        
        const flightId = req.query.flightId;
        
        const flights = await flightInfo.find({_id:ObjectId(req.query.flightId)})
        res.render('travellerDetails',{layout : '../layouts/index',flights:flights,flightId:flightId})
     
    }
    catch(e)
    {
        console.log(e)
    }
});

router.post('/paymentPage',urlencodor, async (req,res) => {
    try{
        
        console.log(req.body)
        //console.log(request.session.passenger);
    }
    catch(e)
    {
        console.log(e);
    }
})

module.exports = router;