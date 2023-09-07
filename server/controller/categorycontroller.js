const asyncHandler = require("express-async-handler");
const CategoryModel = require('../models/categoryModel')


exports.categorycreate =asyncHandler(async(req,res)=>{


    try{
        const category=req.body.category;
        const image=req.file.filename;

        const categories = await CategoryModel.create({
            category:category,
            image:image,
        })
        if(categories){
            // res.send('success')
            res.status(200).json({message:'sucess'})
        }
        else{
            res.send('failed')
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({err:'an error occured'})
    }
})



exports.listcategory= asyncHandler(async(req,res)=>{
    try {
        const categories = await CategoryModel.find()
            res.json(categories)
    }catch(err){
        console.log(err)
        return   res.status(500).json({ error: "An error occurred" });
    }
})

  
  
exports.editcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const categories = await CategoryModel.findById(id);
    if (!categories) {
      res.send("category not available");
    }
    res.json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "an error occured" });
  }
});

exports.updatecategory = asyncHandler(async(req,res)=>{

    const {id} =req.params;
    const { category } = req.body;
    console.log(req.body);
        try {
          const categories = await CategoryModel.findById(id);
          if (!categories) {
            return res.status(404).json({ error: "product not found" });
          }
          categories.category = category;

          if (req.file) {
            categories.image = req.file.filename;
          }
          const up= await categories.save();
          console.log(up,"hellloooooooooooooooooooooooo");

           return res.json(up);
        } catch (err) {
          console.log(err);
          console.log("updateerrror");
          return res.status(500).json({ err: "an error occured in update" });
        }
})


exports.deletecategory = asyncHandler(async(req,res)=>{
  const {id}=req.params;
  try{
    const categories =await CategoryModel.findById(id);
    if(!categories){
      return res.status(404).json({err:'categories not found'})
    }
    await categories.deleteOne();
    res.json({message:'delete category successfull'})
  }catch(err){
    console.log(err);
    return res.status(500).json({err:'an error occured '})
  }
})


  