var express = require('express');
var router = express.Router();
const admincontroller =require ('../controller/admincontroller')
const AdminLog = require('../models/adminModel');
const Authentications = require('../middleware/authmiddleware')
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/upload");
   },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  var upload = multer({ storage: storage });


// admin sign_up creation
router.get('/',async(req,res)=>{
const Admins ={
    name:"Narjisha",
    phone:"8136949407",
    email:"narji@gmail.com",
    password:"123456",
  
}
try {
  const admin = new AdminLog(Admins);
  const savedAdmin = await admin.save();
  res.json({ success: true, admin: savedAdmin });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "An error occurred" });
}
});

router.post('/signin',admincontroller.signin);
router.get ('/adminlist',Authentications,admincontroller.adminlist)
router.post('/createadmin',upload.single("image"),admincontroller.createadmin);
router.get('/adminedit/:id',Authentications,admincontroller.adminedit);
router.put('/updateadmin/:id',Authentications,upload.single("image"),admincontroller.updateadmin);
router.delete('/admindelete/:id',Authentications,admincontroller.admindelete);
router.get('/profile',Authentications,admincontroller.profile);
router.post('/change-password/:id', Authentications, admincontroller.changePassword);
module.exports =router;