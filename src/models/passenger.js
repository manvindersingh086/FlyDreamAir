const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const passengerSchema = new mongoose.Schema({
    userId : {
        type:String,
        required:true
    },
    flightSeat : {
        type :String,
        required :true
    },
    flightId : {
        type:String,
        required:true
    },
    passengerPassportNumber : {
        type:String,
    },
    passengerPassportName : {
        type : String
    },
    passengerDOB : {
        type : String,
        required :true
    },
    passengerGender : {
        type:String,
        required:true
    },
    meal : {
        type:String
    },
    wheelChair : {
        type:String
    },
    passengerLastName : {
        type:String,
        required:true
    },
    passengerFirstName : {
        type:String,
        required:true
    },
    mobileNumber : {
        type:Number,
        required:true
    },
    email : {
        type : String,
        required:true
    },
    flightStatus : {
        type : String,
        required : true
    }
});

const Passenger = mongoose.model('passenger',passengerSchema);
module.exports = Passenger;