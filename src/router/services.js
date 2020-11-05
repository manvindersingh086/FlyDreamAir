const express = require('express')
const GiftCard = require('../models/giftCard')
const db = require('../db/mongoose')
const {check,validationResult}= require('express-validator')
const router = express.Router()
const auth = require('../middleware/auth')
const path = require('path')
const bodyparser = require('body-parser')
const urlencodor =bodyparser.urlencoded({extended : true});
const pdf= require('pdf-creator-node');
const fs = require('fs')
const flightInfo = require('../models/flightInformation')
const creditCard = require('../models/creditCard')
var ObjectId = require('mongodb').ObjectID;
const Passenger = require('../models/passenger')

router.get('/services',urlencodor, async (req,res) => {
    res.render('services',{layout : '../layouts/index'})
})

router.get('/giftCards',urlencodor, async (req,res) => {
    res.render('giftCards',{layout : '../layouts/index'})
})

router.post('/paymentPage',urlencodor, async (req,res) => {

    

    const giftCard = new GiftCard();
    const occassion =  req.body.occassion;
    const amount = req.body.amount;
    const quantity = req.body.quantity;
    const date = req.body.date;
    const message = req.body.message;
    const senderEmail = req.body.senderEmail;
    const senderName = req.body.senderName;
    const senderContactNumber = req.body.senderContactNumber;
    const senderAddress =  req.body.senderAddress;
    const recieverEmail = req.body.recieverEmail;
    const recieverAddress = req.body.recieverAddress;
    const recieverName = req.body.recieverName;
    const recieverContactNumber = req.body.recieverContactNumber;

    giftCard.occassion = occassion;
    giftCard.amount = amount;
    giftCard.quantity = quantity;
    giftCard.date = date;
    giftCard.message = message;
    giftCard.senderEmail = senderEmail;
    giftCard.senderName = senderName;
    giftCard.senderContactNumber = senderContactNumber;
    giftCard.senderAddress = senderAddress;
    giftCard.recieverEmail = recieverEmail;
    giftCard.recieverAddress = recieverAddress;
    giftCard.recieverName = recieverName;
    giftCard.recieverContactNumber = recieverContactNumber;

    req.session.giftCard = giftCard;
    req.session.giftCardAmount = amount;
    res.render('paymentPageGiftCard',{layout : '../layouts/index',amount:amount})

    
})

router.post('/completePaymentGiftCard',urlencodor, async (req,res) => {

    const creditCardNumber = req.body.cardNumber;
    const cardExpiry = req.body.cardExpiry;
    const cardCVV = req.body.cardCVC;

    const creditCardFetch = await creditCard.find({creditCardNumber:creditCardNumber})

    if(!(creditCardFetch == ""))
    {
        console.log(path.join(__dirname)+'/giftCardPdfTemplate.html');
        var html = fs.readFileSync(path.join(__dirname)+'/giftCardPdfTemplate.html', 'utf8');
    
        var options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
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

         req.session.giftCard;

        var giftCard = [{
            occassion : req.session.giftCard.occassion,
            amount  : req.session.giftCard.amount,
            message : req.session.giftCard.message,
            senderName : req.session.giftCard.senderName,
            senderEmail : req.session.giftCard.senderEmail,
            senderAddress : req.session.giftCard.senderAddress,
            recieverName : req.session.giftCard.recieverName,
            recieverEmail : req.session.giftCard.recieverEmail,
            recieverAddress : req.session.giftCard.recieverAddress
         }]
        // var giftCardSenderName = [{
        //     giftCard : giftCard
        // }]
        var document = {
            html: html,
            data: {
                giftCard: giftCard
            },
            path: "./GiftCard.pdf"
        };
    
        pdf.create(document, options)
        .then(res => {
            res.render('succefulCardBooking',{layout : '../layouts/index'})
        })
        .catch(error => {
            res.render('succefulCardBooking',{layout : '../layouts/index'})
        });

    }

   
})

router.get('/cancelFlightBooking',urlencodor,async (req,res) => {

    const flightId = req.query.flightId;
    const flights = await flightInfo.find({_id:Object(flightId)})
    console.log(flights);
    res.render('cancelFlight',{layout : '../layouts/index',flights:flights})
    
})

router.post('/inFlightServicesBook',urlencodor, async (req,res) => {
    const lastName = req.body.lastName;
    const bookingId = req.body.bookingId;
    
    const flights = await Passenger.find({flightId:bookingId,passengerLastName:lastName});
    if(flights != "")
    {
        res.render('successfulInFlightServices',{layout : '../layouts/index'})
    }
    else
    {
        res.render('incorrectDetails',{layout : '../layouts/index'})
    }

})

module.exports = router;