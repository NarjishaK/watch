var express = require('express');
var router = express.Router();
const BannerController= require('../controller/bannercontroller');
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


router.post('/bannercreate', upload.array("image"), BannerController.bannercreate);
router.get('/bannerlist',BannerController.bannerlist);
router.put('/bannerupdate/:id',upload.array("image"),BannerController.bannerupdate);
router.delete('/bannerdelete/:id',BannerController.bannerdelete);
  module.exports = router;