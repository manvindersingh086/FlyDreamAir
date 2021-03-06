const mongoose = require('mongoose')
const validator = require('validator');
const feedbackSchema = new mongoose.Schema({
    name : {
        type : String,
        required : 'Name is required',
        trim : true
    },
    email : {
        type : String,
        lowercase : true,
        trim : true,
        required : true,
    },
    type : {
        type: String,
        required:true
    },
    comments : {
        type : String
    }
    
})

const Feedback = mongoose.model('feedback',feedbackSchema);
module.exports = Feedback;