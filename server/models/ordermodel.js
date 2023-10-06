const mongoose =require('mongoose')

const orderSchema = mongoose.Schema({
    userId:String,
    orderId:String,
    cartItems:[
        {
            id:String,
            image:String,
            productname:String,
            quantity:Number,
            offerprice:Number,
            brand:String,
            // status:String,
        }
    ],
    billingDetails:{
        name:String,
        phone:Number,
        email:String,
        city:String,
        country:String,
        address:String,
        pincode:String,
        state:String,
    },
    shippingDetails:{
        name:String,
        phone:Number,
        email:String,
        city:String,
        country:String,
        address:String,
        pincode:String,
        state:String,
    },
    subtotal:Number,
    discount:Number,
    total:Number,
});

const OrderList = mongoose.model('OrderList',orderSchema);
module.exports= OrderList;