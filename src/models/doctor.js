const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  crm: String,
  spec: String,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
