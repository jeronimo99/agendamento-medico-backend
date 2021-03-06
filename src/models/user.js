const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
  role: String,
  schedules: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
