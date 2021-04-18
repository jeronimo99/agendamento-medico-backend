const dotenv = require('dotenv');
const { validationResult } = require('express-validator');

dotenv.config();

const Doctor = require('../models/doctor');
const User = require('../models/user');

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
      schedules: [],
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
  const { id } = req.params;

  try {
    const result = await Doctor.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(400).json({ error: 'Could not find this doctor.' });
    }

    res.status(200).json({ msg: 'Doctor deleted with success.' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getPatientsController = async (req, res, next) => {
  try {
    const patients = await User.find({ role: 'user' });

    res.status(200).json({ patients });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getAppointmentsByDoctorController = async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.query;

  try {
    const doctor = await Doctor.findOne({ _id: id });

    const dateIndex = doctor.schedules.findIndex(
      (schedule) => schedule.date === date
    );

    if (dateIndex < 0) {
      return res.status(200).json([]);
    }

    const appointments = doctor.schedules[dateIndex].appointments;

    res.status(200).json({ appointments: appointments });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  addDoctorController,
  getDoctorsController,
  deleteDoctorsController,
  getPatientsController,
  getAppointmentsByDoctorController,
};
