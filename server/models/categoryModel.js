const mongoose =require('mongoose')

const categorySchema = mongoose.Schema({
    category:{type:String,required:true},
    image:{type:String,required:true},
})

const CategoryList = mongoose.model('CategoryList',categorySchema);
module.exports= CategoryList;