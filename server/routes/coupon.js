var express = require("express");
var router = express.Router();
const Couponcontroller = require("../controller/couponcontroller");


router.post('/couponcreate',Couponcontroller.couponcreate);
router.post('/couponcheck',Couponcontroller.couponcheck);
router.get('/listcoupon',Couponcontroller.listcoupon);
router.get('/editcoupon/:id',Couponcontroller.editcoupon);
router.put('/updatecoupon/:id',Couponcontroller.updatecoupon);
router.delete('/deletecoupon/:id',Couponcontroller.deletecoupon);


module.exports = router;
