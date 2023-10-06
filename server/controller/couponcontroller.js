const asyncHandler = require("express-async-handler");
const CouponModel = require('../models/couponmodel');


exports.couponcreate =asyncHandler(async(req,res)=>{
    
    const {couponname,couponcode,discount}=req.body;
    console.log(req.body)
    try{
        
     const coupon = await CouponModel.create({
        couponname:couponname,
        couponcode:couponcode,
        discount:discount,
        })
        coupon.couponname=couponname;
        coupon.couponcode=couponcode;
        coupon.discount=discount;
        return res.send('coupon here')
    }catch(err){
        console.log(err)
        return res.status(500).json({err:'an error occured'})
    }
});


exports.listcoupon = asyncHandler(async(req,res)=>{
    try{
        const coupon = await CouponModel.find()
        res.json(coupon)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:'an error occured in coupon list'})
    }
})

exports.editcoupon = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    try {
      const coupon = await CouponModel.findById(id);
      if (!coupon) {
        res.send("coupon not available");
      }
      res.json(coupon);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: "an error occured in coupon edit" });
    }
})

exports.updatecoupon = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const {couponname,couponcode,discount}=req.body;
    try{
        
        const coupon =await CouponModel.findById(id);
        if(!coupon){
            return res.status(400).json({err:'coupon not available'})
        }
        coupon.couponname=couponname;
        coupon.couponcode=couponcode;
        coupon.discount=discount;

        const updatedcoupns=await coupon.save()
        res.json(updatedcoupns)        
    }catch(err){
        console.log(err);
    }
})

exports.deletecoupon = asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
      const coupon =await CouponModel.findById(id);
      if(!coupon){
        return res.status(404).json({err:'coupon not found'})
      }
      await coupon.deleteOne();
      res.json({message:'delete coupon successfull'})
    }catch(err){
      console.log(err);
      return res.status(500).json({err:'an error occured '})
    }
  })

  
  exports.couponcheck =asyncHandler(async(req,res)=>{
    console.log("hiiiiii")
    const {couponcode} =req.body
    console.log(couponcode,'rrrrrrrrrrrrrr')
    try{
      const coupon = await CouponModel.findOne({couponcode:couponcode});
      if(coupon){
      res.json(coupon);
      }else{
        return res.status(404).json({ err: 'coupon not found' });    }
    }catch(err){
      console.log(err)
      return res.status(500).json({err:'an error occured in coupon'})
    }
  });