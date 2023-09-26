const asyncHandler = require("express-async-handler");
const UserList = require('../models/usersModel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer =require('nodemailer')
const OtpModal =require('../models/otpmodel')

exports.createuser = asyncHandler(async(req,res)=>{
    const {username,userphone,useremail,password,address,country,dob,city,pincode}= req.body;
    const image=req.file.filename;
  
    try{
      const users = await UserList.findOne({useremail});
      if(users){
        return res.status(400).json({invalid:true,message:'email already exist'})
      }
      const admin = await UserList.create({
        username:username,
        userphone:userphone ,
        useremail:useremail,
        password:password,
        address:address ,
        country:country ,
        dob:dob,
        city:city,
        pincode:pincode,
        image:image ,
      })
      if(users){
      res.send('success')
      }else{
        res.send('failed')
      }
    }catch(error){
      console.log(error)
      return res.status(500).json({error:'an error occured'})
    }
  })

  exports.usersignin = asyncHandler(async (req, res) => {
    const useremail = req.body.useremail;
    const password = req.body.password;
  
      const user = await UserList.findOne({ useremail: useremail });
      console.log(user.useremail);
      console.log(user.password);
      console.log(req.body.password)
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      console.log(isPasswordMatch)
      if (user && isPasswordMatch)  {
        const userpage={
          id:user._id,
          username:user.username,
          userphone:user.userphone ,
          address:user.address ,
          country:user.country ,
          dob:user.dob,
          city:user.city,
          pincode:user.pincode,
          image:user.image,
          useremail:user.useremail
  
        }
      // const token = jwt.sign({ email: admin.email }, 'myjwtsecretkey');
      const token = jwt.sign({ useremail: user.useremail }, 'myjwtsecretkey');
      user.tokens=token;
      user.save()
      res.status(200).json({ token: token,userpage:userpage });
      } else {
        res.status(400).json({invalid: true, message: 'Invalid credential'});
      }
  });

  // exports.userlist = asyncHandler(async (req, res) => {
  //   try {
  //     const user = await UserList.find();
  //     res.json(user);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "An error occurred" });
  //   }
  // });
  
  exports. forgotpassword =asyncHandler(async(req,res)=>{
    const useremail =req.body.useremail
    try{
      const user =await UserList.findOne({useremail:useremail})
      if(!user){
        return res.status(400).json({err:'email not found'})
      }else{
        const data={
          id:user._id,
          useremail:user.useremail,
        }   
        return res.status(200).json({data:data})     
      }
    }catch(err){
      console.log(err)
      return res.status(500).json({err:'anerror occured'})
    }
  });

exports.userediting =asyncHandler(async(req,res)=>{
  const {id}=req.params;
  try {
    const user = await UserList.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: 'an error occurred' });
  }
})

exports.getotp=asyncHandler(async(req,res)=>{
  const {useremail} =req.body;
  try{
    const user =await UserList.findOne({useremail:useremail})
    if(user){
      const formattedEmail=user.useremail;
      let digits= '0123456789';
      let OTP='';
      for(i=0;i<4;i++){
        OTP+=digits[Math.floor(Math.random()*10)]
      }
      const currentTimestamp =Date.now();
      
      const transporter =nodemailer.createTransport({
        service:'Gmail',
        host:'smpt.gmail.com',
        auth:{
          user:'navaskuniyil6@gmail.com',
          pass:'wlhqjzsuoqsnztnf'
        },
      });
      
      const info= await transporter.sendMail({
        from:'"Chopard"<navaskuniyil6@gmail.com>',
        to:formattedEmail,
        subject:'OTP verification',
        html:`<strong>Chopard:</strpong>Use<strong>${OTP}</strong>to rest your password .do not give the code to anyone`,
      });
      
      const saveOTP = await OtpModal.create({
        otp:OTP,
        timestamp:currentTimestamp,
      });
      console.log('OTP instance created:',saveOTP,info);
      res.json({message:'OTP send successfully'});
    }else{
      res.status(404).json({err:'user not found'});
    }
  }catch(err){
    console.log(err)
  }
})


