const express = require('express')
const flightInfo = require('../models/flightInformation')
const db = require('../db/mongoose')
const {check,validationResult, query}= require('express-validator')
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
                const airlineClass = req.body.airlineClass;
                const flightAirlineName = req.body.airlineName;
                const flightT = req.body.flightT; 
                req.session.adult = req.body.adult;
                req.session.child = req.body.child;
                req.session.flightType = flightType;
                var query= {flightType:flightType,origin:origin,destination:destination,flightClass:airlineClass};
                if(flightAirlineName != "none")
                {
                    query.flightAirlineName=flightAirlineName;
                }
               

                if(flightT != "none")
                {
                    query.flightT=flightT;
                }
               
                console.log(query);
                const flights = await flightInfo.find(query).limit()
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
        const adultCount = req.session.adult;
        const flightType = req.session.flightType;
        const flights = await flightInfo.find({_id:ObjectId(req.query.flightId)})
        res.render('travellerDetails',{layout : '../layouts/index',adultCount:adultCount,flightType:flightType,flights:flights,flightId:flightId})
     
    }
    catch(e)
    {
        console.log(e)
    }
});

router.post('/seatSelection',urlencodor, async (req,res) => {
    try{
       
        console.log(req.body.firstName);
        console.log(req.body.passportNumber);
        const adult = req.session.adult;
        res.render('seatSelection',{layout : '../layouts/index',adult:adult})
     
    }
    catch(e)
    {
        console.log(e)
    }
});

// /router.post('/paymentPage',urlencodor, async (req,res) => {
//     try{
        
//         console.log(req.body)
//         //console.log(request.session.passenger);
//     }
//     catch(e)
//     {
//         console.log(e);
//     }
// })

module.exports = router;