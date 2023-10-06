var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser')
const mongoose =require('mongoose')

const connectDB =require('./config/db')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter =  require('./routes/admin');
var categoryRouter = require('./routes/category');
var productRouter =require('./routes/product')
var bannerRouter =require('./routes/banner')
var userRouter =require('./routes/user')
var couponRouter =require('./routes/coupon')

var app = express();
connectDB()
app.use(cors({
  origin: ['http://localhost:3000'], // Your React app's URL
  methods:['PUT','POST','PUSH','DELETE'],
  credentials: true,
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/category',categoryRouter);
app.use('/product',productRouter);
app.use('/banner',bannerRouter);
app.use ('/user',userRouter);
app.use('/coupon',couponRouter);
app.use(bodyparser.json({limit: '500mb'}));//increse the payload size
app.use(bodyparser.urlencoded({extended:true,limit: '500mb'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
