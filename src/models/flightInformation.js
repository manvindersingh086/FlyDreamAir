const mongoose = require('mongoose')
const flightSchema = new mongoose.Schema({
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
    }
})

const flightInfo = mongoose.model('flightInformation',flightSchema);

module.exports = flightInfo;