var express = require('express');
var router = express.Router();
const Productcontroller =require ('../controller/productcontroller');
const multer = require("multer");
const Authentications = require('../middleware/authmiddleware')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/upload");
   },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  var upload = multer({ storage: storage });


  router.post('/productcreate',Authentications,upload.array("image"),Productcontroller.productcreate);
  router.get('/listcategory',Authentications,Productcontroller.listcategory);
  router.get('/listproduct',Authentications,Productcontroller.listproduct);
  router.get('/detailcategory/:id',Authentications,Productcontroller.detailcategory);
  router.get('/productdetails/:id',Authentications,Productcontroller.productdetails);
  router.delete('/deleteProduct/:id',Authentications,Productcontroller.deleteProduct);
  router.get('/productedit/:id',Authentications,Productcontroller.productedit);
  router.put('/updateproduct/:id', Authentications,upload.array("image"), Productcontroller.updateproduct);



  module.exports =router;