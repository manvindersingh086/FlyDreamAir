const mongoose = require('mongoose')
const flightSchema = new mongoose.Schema({
    pnrNumber : {
        type : String
    },
    flightAirlineName : {
        type : String
    }
    ,
    origin : {
        type: String
    },
    originCode : {
        type : String
    },
    destination : {
        type : String
    },
    destinationCode : {
        type : String
    },
    flightDuration : {
        type : String
    },
    distance : {
        type : Number
    },
    flightType: {
        type : String
    },
    flightPrice: {
        type : Number
    },
    flightClass: {
        type: String
    },
    departureDate: {
        type: String
    },
    flightT:{
        type:String
    },
    transitLocation:{
        type:String
    },
    transitLocTime:{
        type:String
    }
})

const flightInfo = mongoose.model('flightInformation',flightSchema);

module.exports = flightInfo;