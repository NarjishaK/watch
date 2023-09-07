const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location:{type:String,required:true},
  roll:{type:String,required:true},
  image:{type:String,required:true},
  tokens: { type: String, default: '' },
});

// Pre-save middleware to hash the password
adminSchema.pre('save', async function (next) {
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

const AdminLog = mongoose.model('AdminLog', adminSchema);
module.exports = AdminLog;
