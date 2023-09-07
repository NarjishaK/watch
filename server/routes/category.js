var express = require('express');
var router = express.Router();
const Categorycontroller =require ('../controller/categorycontroller');
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


router.post('/categorycreate',Authentications,upload.single("image"),Categorycontroller.categorycreate);
router.get('/listcategory',Authentications,Categorycontroller.listcategory);
router.get('/editcategory/:id',Authentications,Categorycontroller.editcategory);
router.put('/updatecategory/:id',Authentications,upload.single("image"),Categorycontroller.updatecategory);
router.delete('/deletecategory/:id',Authentications,Categorycontroller.deletecategory);

module.exports = router;