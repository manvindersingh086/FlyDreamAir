const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const creditCard = new mongoose.Schema({
    creditCardNumber : {
        type: String,
        required : true
    },
    cardHolderName : {
        type : String,
    },
    cardExpiry : {
        type : String,
        required :  true
    },
    cardCVV : {
    type: String,
    required : true
    }
})

const creditCardD = mongoose.model('creditCard',creditCard);
module.exports = creditCardD;