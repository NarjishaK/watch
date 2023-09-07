const mongoose=require('mongoose');

const bannerSchema =mongoose.Schema({
    title:{type:String,required:true},
    subtitle1:{type:String,required:true},
    subtitle2:{type:String,required:true},
    image:[{type:String,required:true}],

})
const BannerList = mongoose.model('BannerList',bannerSchema);
module.exports= BannerList;
