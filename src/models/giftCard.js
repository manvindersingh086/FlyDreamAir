const mongoose = require('mongoose')
const validator = require('validator');
const giftCardSchema = new mongoose.Schema({
    ocassion : {
        type : String,
        required : 'Ocassion is required',
        trim : true
    },
    quantity : {
        type : String,
        required : 'Quantity is required',
        trim : true
    },
    amount : {
        type : Number,
        required : 'Amount is required',
        trim : true
    },
    date : {
        type : String,
        required : 'Date is required',
        trim : true
    },
    message : {
        type : String,
        required : 'Message is required',
        trim : true
    },
    senderName : {
        type : String,
        required : 'Sender name is required',
        trim : true
    },
    senderEmail : {
        type : String,
        required : 'Sender Email is required',
        trim : true
    },
    senderAddress : {
        type : String,
        required : 'Sender Address is required',
        trim : true
    },
    senderContactNumber : {
        type : Number,
        required : 'sender contact is required',
        trim : true
    },
    recieverName : {
        type : String,
        required : 'reciever name is required',
        trim : true
    },
    recieverEmail : {
        type : String,
        required : 'reciever Email is required',
        trim : true
    },
    recieverAddress : {
        type : String,
        required : 'reciever Address is required',
        trim : true
    },
    recieverContactNumber : {
        type : Number,
        required : 'reciever contact is required',
        trim : true
    },
})

const giftCard = mongoose.model('giftCard',giftCardSchema);
module.exports = giftCard;