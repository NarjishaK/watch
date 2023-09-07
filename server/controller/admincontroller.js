const asyncHandler = require("express-async-handler");
const AdminLog = require('../models/adminModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

    const admin = await AdminLog.findOne({ email: email });
    console.log(admin.email);
    console.log(admin.password);
    console.log(req.body.password)
    const isPasswordMatch = await bcrypt.compare(password, admin.password);
    console.log(isPasswordMatch)
    if (admin && isPasswordMatch)  {
      const userprofile={
        id:admin._id,
        name:admin.name,
        phone:admin.phone,
        location:admin.location,
        roll:admin.roll,
        image:admin.image

      }
    // const token = jwt.sign({ email: admin.email }, 'myjwtsecretkey');
    const token = jwt.sign({ email: admin.email }, 'myjwtsecretkey');
    admin.tokens=token;
    admin.save()
    res.status(200).json({ token: token,userprofile:userprofile });
    } else {
      res.status(400).json({invalid: true, message: 'Invalid credential'});
    }
});

exports.adminlist = asyncHandler(async (req, res) => {
  try {
    const admin = await AdminLog.find();
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


exports.createadmin = asyncHandler(async(req,res)=>{
  const {name,phone,email,password,location,roll}= req.body;
  const image=req.file.filename;

  try{
    const admins = await AdminLog.findOne({email});
    if(admins){
      return res.status(400).json({invalid:true,message:'email already exist'})
    }
    const admin = await AdminLog.create({
      name:name,
      phone:phone ,
      email:email,
      password:password,
      location:location ,
      roll:roll ,
      image:image ,
    })
    if(admin){
    res.send('success')
    }else{
      res.send('failed')
    }
  }catch(error){
    console.log(error)
    return res.status(500).json({error:'an error occured'})
  }
})



// exports.adminedit =asyncHandler(async(req,res)=>{
//   const {id} = req.params;
//   console.log("Received ID:", id);
//   try{
//     const admin = await AdminLog.findById(id);
//     if(!admin){
//      return req.status(404).json({error:'admin not found'})
//     }
//     res.json(admin)
//   }catch(err){
//     console.log(err)
//     return res.status(500).json({err:'an error occured'})
//   }
// })
exports.adminedit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await AdminLog.findById(id);
    if (!admin) {
      return res.status(404).json({ error: 'admin not found' });
    }
    res.json(admin);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'an error occurred' });
  }
});

  

exports.updateadmin = asyncHandler(async(req,res)=>{
  const{id}=req.params;
  const {phone,name,email,password,location,roll} =req.body
  try{
    const admin = await AdminLog.findById(id);
    if(!admin){
      return res.status(404).json({err:'admin not found'})
    }
      admin.phone =phone;   
      admin.name =name;   
      admin.email = email;   
      admin.location = location;
      admin.roll=roll;
      if (req.file) {
        admin.image = req.file.filename;
      } 
    if(password){
      admin.password =await bcrypt.hash (password,10);

    }
    const updateadmins = await admin.save()
    res.json(updateadmins)
  }catch(err){
    console.log(err)
    return res.status(500).json({err:'aan error occured'})
  }
})

exports.admindelete =asyncHandler(async(req,res)=>{
  const {id}= req.params;
  try{
    const admin = await AdminLog.findById(id);
    if(!admin){
      return res.status(404).json({err:'admin not found'})
    }
    await admin.deleteOne();
    res.json({message:"delete successfully"})
  }catch(err){
    console.log(err);
    return res.status(500).json({err:'an error occured'})
  }
})


exports.profile =asyncHandler(async(req,res)=>{
  const adminemail =req.user.email
  try{
    const admin = await AdminLog.findOne({email:adminemail});
    if(admin){
    res.json(admin);
    }else{
      return res.status(404).json({ err: 'User not found' });    }
  }catch(err){
    console.log(err)
    return res.status(500).json({err:'an error occured in profile'})
  }
});


exports.changePassword = asyncHandler(async (req, res) => {
  const userId = req.params.id
   
  const { oldPassword, newPassword } = req.body;

  

  try {
    const admin = await AdminLog.findById(userId);
   

    if (!admin) {
      return res.status(404).json({invalid:true, message: 'Admin not found' });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, admin.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
});