const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
dotenv.config();

const Doctor = require('../models/doctor');

const addDoctorController = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: 'Validation error.' });
  }

  const { name, crm, spec } = req.body;

  try {
    const doctor = await Doctor.findOne({ crm });
    if (doctor) {
      return res.status(400).json({ error: 'CRM already exists.' });
    }

    const newDoctor = new Doctor({
      name,
      crm,
      spec,
    });
    await newDoctor.save();

    res.status(200).json({ doctor: newDoctor });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getDoctorsController = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});

    res.status(200).json({ doctors });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deleteDoctorsController = async (req, res, next) => {
  const { crm } = req.params;

  try {
    await Doctor.deleteOne({ crm });
    res.status(200).json({ msg: 'Doctor deleted with success.' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  addDoctorController,
  getDoctorsController,
  deleteDoctorsController,
};
