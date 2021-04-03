const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  name: String,
  phone: String,
})

const User = mongoose.model('User', userSchema);

module.exports = User;