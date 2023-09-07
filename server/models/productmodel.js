const mongoose =require ('mongoose')

const productSchema = mongoose.Schema({
    image:[{type:String,required:true}],
    category:{type:String,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    productname:{type:String,required:true},
    brand:{type:String,required:true}
})

const ProductList = mongoose.model('ProductList',productSchema);
module.exports= ProductList;