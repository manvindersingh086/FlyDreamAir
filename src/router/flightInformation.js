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
const Passenger = require('../models/passenger')
const creditCard = require('../models/creditCard')
const pdf= require('pdf-creator-node');
const fs = require('fs')
const path = require('path')


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
        req.session.flightAmount = flights[0].flightPrice;
        res.render('travellerDetails',{layout : '../layouts/index',adultCount:adultCount,flightType:flightType,flights:flights,flightId:flightId})
     
    }
    catch(e)
    {
        console.log(e)
    }
});

router.post('/seatSelection',urlencodor, async (req,res) => {
    try{
        const passngr = new Passenger();
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const gender = req.body.gender;
        const meal = req.body.meal;
        const wheelChair = req.body.wheelChair;
        const dateOfBirth = req.body.DOB;
        const passportNumber = req.body.passportNumber;
        const passportName = req.body.passportName;
        const mobileNumber = req.body.mobileNumber;
        const emailId = req.body.emailId;
        const adult = req.session.adult;
        const flightId = req.query.flightId;
        const useremail =  req.session.useremail;

        passngr.passengerFirstName = firstName;
        passngr.passengerLastName = lastName;
        passngr.passengerGender = gender;
        passngr.meal = meal;
        passngr.wheelChair = wheelChair;
        passngr.passengerDOB = dateOfBirth;
        passngr.passengerPassportNumber = passportNumber;
        passngr.passengerPassportName = passportName;
        passngr.mobileNumber = mobileNumber;
        passngr.email = emailId;
        passngr.flightId = flightId;
        passngr.userId = useremail;

        req.session.passenger = passngr;
      
        res.render('seatSelection',{layout : '../layouts/index',adult:adult})
     
    }
    catch(e)
    {
        console.log(e)
    }
});

router.post('/seatSelectionPaymentPage',urlencodor, async (req,res) => {
    try{
        
       
        //const flights = await creditCard.find({})
        const flightAmount = req.session.flightAmount;
        console.log(flightAmount);
        res.render('paymentPage',{layout : '../layouts/index',flightAmount:flightAmount})
    }
    catch(e)
    {
        console.log(e);
    }
})

router.post('/completePayment',urlencodor, async (req,res) => {
    try{
        const creditCardNumber = req.body.cardNumber;
        const cardExpiry = req.body.cardExpiry;
        const cardCVV = req.body.cardCVC;
        const PASSENGER = new Passenger();

        const creditCardFetch = await creditCard.find({creditCardNumber:creditCardNumber})
        if(!(creditCardFetch == ""))
        {
            const sesPassenger = req.session.passenger;
            PASSENGER.passengerFirstName = sesPassenger.passengerFirstName;
            PASSENGER.passengerLastName = sesPassenger.passengerLastName;
            PASSENGER.meal = sesPassenger.meal;
            PASSENGER.flightId = sesPassenger.flightId;
            PASSENGER.mobileNumber = sesPassenger.mobileNumber;
            PASSENGER.passengerGender = sesPassenger.passengerGender;
            PASSENGER.passengerDOB = sesPassenger.passengerDOB;
            PASSENGER.passengerPassportNumber = sesPassenger.passengerPassportNumber;
            PASSENGER.passengerPassportName = sesPassenger.passengerPassportName;
            PASSENGER.userId = sesPassenger.userId;
            PASSENGER.email = sesPassenger.email;
            PASSENGER.flightStatus = "booked";
            PASSENGER.flightSeat = "1B";
            await PASSENGER.save();
            const passg = await Passenger.find({email:sesPassenger.email})
            const bookingId = passg[0]._id;
            const flights = await flightInfo.find({_id:ObjectId(sesPassenger.flightId)})
            
            //PDF CREATION CODE BEGINS

            var html = fs.readFileSync(path.join(__dirname)+'/passengerPDFTemplate.html', 'utf8');

            var options = {
                format: "A3",
                orientation: "portrait",
                border: "10mm",
                header: {
                    height: "45mm"
                },
                "footer": {
                    "height": "28mm",
                    "contents": {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
            };
            
             var passng = [{
                passengerFirstName : PASSENGER.passengerFirstName,
                passengerLastName  : PASSENGER.passengerLastName,
                mobileNumber : PASSENGER.mobileNumber,
                passengerPassportNumber : PASSENGER.passengerPassportNumber,
                passengerPassportName : PASSENGER.passengerPassportName,
                flightStatus : PASSENGER.flightStatus,
                flightSeat : PASSENGER.flightSeat,
                flightType : flights[0].flightType,
                flightClass : flights[0].flightClass,
                departureDate : flights[0].departureDate,
                flightType : flights[0].flightT,
                origin : flights[0].origin,
                destination : flights[0].destination,
                flightAirlineName : flights[0].flightAirlineName,
                pnrNumber : flights[0].pnrNumber,
                bookingId : bookingId

             }]
           
            var document = {
                html: html,
                data: {
                    Passenger: passng
                },
                path: "./flightDetails.pdf"
            };
        
            pdf.create(document, options)
            .then(res => {
                res.render('successFulBooking',{layout : '../layouts/index'})
            })
            .catch(error => {
                res.render('successFulBooking',{layout : '../layouts/index'})
            });
            //PDF CREATION CODE ENDS
        }
    }
    catch(e)
    {
        console.log(e)
    }
})

module.exports = router;