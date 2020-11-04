const mongoose = require('mongoose')
const couponCodeSchema = new mongoose.Schema({ 
    couponCode : {
        type : String
    }
})

const couponCodeM = mongoose.model('coupon',couponCodeSchema);
module.exports = couponCodeM;
