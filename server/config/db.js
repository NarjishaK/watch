const mongoose = require('mongoose')
function connectDB(){
    mongoose.connect('mongodb://0.0.0.0:27017/Watchapp',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log('Database connected');
        console.log('http://localhost:8000');
    })
    .catch((err)=>{
        console.log('database error \n '+err)
    })
}
module.exports = connectDB;