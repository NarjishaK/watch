const mongoose =require('mongoose')

const couponSchema = mongoose.Schema({
    couponname:{type:String,required:true},
    couponcode:{type:String,required:true},
    discount:{type:Number,required:true},
})

const CouponList = mongoose.model('CouponList',couponSchema);
module.exports= CouponList;