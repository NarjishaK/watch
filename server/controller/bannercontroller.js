const asyncHandler = require("express-async-handler");
const BannerModel =require('../models/bannerModel');


exports.bannercreate =asyncHandler(async(req,res)=>{
    const{title,subtitle1,subtitle2}=req.body;
    const files = req.files;
    const image = files.map((file) => file.filename);
    try{
        const banner = await BannerModel.create({
            title:title,
            subtitle1:subtitle1,
            subtitle2:subtitle2,
            image:image,
        })
        banner.title=title;
        banner.subtitle1=subtitle1;
        banner.subtitle2=subtitle2;
        banner.image=image;
        return res.send("banner here");
    }catch(err){
        console.log(err);
        return res.status(500).json({err:'an error occured in banner create'})
    }
});

exports.bannerlist =asyncHandler(async(req,res)=>{
    try{
        const banner =await BannerModel.find();
        res.json(banner);
    }catch(err){
        console.log(err);
        return res.status(500).json({err:'banner is not found'})
    }
});




exports.bannerupdate =asyncHandler(async(req,res)=>{
    
    const {id}=req.params;
    const {subtitle1,subtitle2,title}=req.body;
    // const files = req.files;
    // const image = files.map((file) => file.filename);
    const newImages = req.files.map((file) => file.filename);
    try{
        
        const banner =await BannerModel.findById(id);
        if(!banner){
            return res.status(400).json({err:'banner not available'})
        }
        banner.title=title;
        banner.subtitle1=subtitle1;
        banner.subtitle2=subtitle2;
        if(newImages && newImages.length >0){
        banner.image=newImages;
        }

        const bannerupdate=await banner.save()
        res.json(bannerupdate)
        console.log('iiiiiiiiiiiiii')
        
    }catch(err){
        console.log(err);
    }
})

exports.bannerdelete =asyncHandler(async(req,res)=>{
    const {id}= req.params;
    try{
        const banner= await BannerModel.findById(id)
        if (!banner) {
            return res.status(404).json({ err: 'banner not found' });
          }
          await banner.deleteOne();
          res.json({ message: 'banner deleted successfully' });
    }catch(err){
        console.log(err);
        return res.status(500).json({ err: 'An error occurred in deleting banner' });
    }
})