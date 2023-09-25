const mongoose =require ('mongoose')
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    image:{type:String,required:true},
    username:{type:String,required:true},
    userphone:{type:Number,required:true},
    useremail:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    dob:{type:String,required:true},
    country:{type:String,required:true},
    city:{type:String,required:true},
    pincode:{type:String,required:true},
});


userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      if (!this.password.startsWith('$2b$')) {
        try {
          const hashedPassword = await bcrypt.hash(this.password, 10);
          this.password = hashedPassword;
          next();
        } catch (error) {
          return next(error);
        }
      } else {
        return next();
      }
    } else {
      return next();
    }
  });


const UserList = mongoose.model('UserList',userSchema);
module.exports= UserList;