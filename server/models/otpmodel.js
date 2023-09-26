const mongoose =require('mongoose')

const otpSchema = mongoose.Schema({
    otp:{type:Number,required:true},
    timestamp:{type:Number,required:true},
})

const OtpModel = mongoose.model('OtpModel',otpSchema);
module.exports= OtpModel;