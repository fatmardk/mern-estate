const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Lütfen kullanıcı adı giriniz"]
  },
  email: {
    type: String,
    required: [true, "Lütfen email giriniz"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Lütfen şifre giriniz"]
  },
  admin: {
    type: Boolean,
    required: [true, "Lütfen şifre giriniz"],
    default:false
  }
}, {
  timestamps: true
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;