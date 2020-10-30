const mongoose = require('mongoose');
const validator = require('validator');
const tripsSchema =  new mongoose.Schema({
    userId:{
        type : String,
        required : 'User Id is required'
    },
    email : {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value))
            {
                throw new Error('Email is invalid!')
            }
        } 
    },
    flightId : {
        type : String,
        required : true
    },
    passengerId : {
        type : String,
        required : true
    }
})

const Trips = mongoose.model('trips',tripsSchema);
module.exports = Trips;