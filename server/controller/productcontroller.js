const asyncHandler = require("express-async-handler");
const ProductModel = require('../models/productmodel')
const CategoryModel = require('../models/categoryModel')

exports.productcreate= asyncHandler(async(req,res)=>{

    try{
        const {category,price,description,productname,brand,offerprice}=req.body;
        // const image =req.file.filename;
        const files = req.files;
        const image = files.map((file) => file.filename);
        const product =await ProductModel.create({
            category:category,
            productname:productname,
            price:price,
            image:image,
            description:description,
            brand:brand,
            offerprice:offerprice,
        })
        product.category=category;
        product.productname=productname;
        product.price=price;
        product.description=description;
        product.brand=brand;
        product.offerprice=offerprice
        product.image=image;
        // if(req.file){
        //     product.image=req.file.filename
        // }
        return res.send("collected product");
    }catch(err){
        console.log(err);
        return res.status(500).json({err:'an error occured in product create'})
    }
})

exports.listcategory = asyncHandler(async (req, res) => {
    try {
      const categories = await CategoryModel.find();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

  exports.listproduct =asyncHandler(async(req,res)=>{
    try{
        let products =await ProductModel.find();
        console.log(products)
   
            res.json(products)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:'an error occured in listproduct'});
    }
  });

  exports.detailcategory =asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        let catproducts =await CategoryModel.findById(id);
        console.log(catproducts.category)
        let products =await ProductModel.find({category: catproducts.category});
        console.log(products)
        res.json(products)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:'an error occured in listproduct'});
    }
  });

  exports.productdetails =asyncHandler(async(req,res)=>{
    const {id}=req.params;
    try{
        let products =await ProductModel.findById(id);
        console.log(products)
        res.json(products)
    }catch(err){
        console.log(err);
        return res.status(500).json({err:'an error occured in product details'});
    }
  });



exports.deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(404).json({ err: 'Product not found' });
      }
      await product.deleteOne();
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'An error occurred in deleting product' });
    }
  });
  



  exports.productedit =asyncHandler(async(req,res)=>{
    const {id} =req.params;
    try{
        const product = await ProductModel.findById(id);
        if(!product){
          return req.status(404).json({error:'product not found'})
        }
        res.json(product)
    }
    catch(err){
        console.log(err)
        return res.status(500).json({err:'an error occured in product edit'})
    }
  });

  exports.updateproduct =asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const {brand,productname,category,price,description,offerprice}=req.body;
    const files = req.files;
    const image = files.map((file) => file.filename);
    
    try{
      const product = await ProductModel.findById(id);
      if(!product){
        return res.status(400).json({err:'product not available'})
      }
      product.price=price;
      product.productname=productname;
      product.category=category;
      product.description=description;
      product.brand=brand;
      product.offerprice=offerprice;
      if (files && files.length>0) {
        product.image = image;
      } 
      const updatedproduct =await product.save()
      res.json(updatedproduct)
    }catch(err){
      console.log(err);
      return res.status(500).json({err:'an error occured in updation'})
    }
  })