var express =require('express');
var router =express.Router();
const UserController = require('../controller/usercontroller');
const UserList =require('../models/usersModel');

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

  router.post('/createuser',upload.single("image"),UserController.createuser);
  router.post('/usersignin',UserController.usersignin);
  router.get('/userediting/:id',UserController.userediting);
  router.post('/forgotpassword',UserController.forgotpassword);

  module.exports= router;