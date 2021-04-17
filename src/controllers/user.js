const dotenv = require('dotenv');
const Doctor = require('../models/doctor');
dotenv.config();

const getSpecsController = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});

    const specs = doctors.map((doctor) => doctor.spec);

    const noRepeatedSpecs = [...new Set(specs)];

    res.status(200).json({ specs: noRepeatedSpecs });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getDoctorsBySpecController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const doctors = await Doctor.find({ spec: id });
    console.log(doctors);
    res.status(200).json({ doctors });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { getSpecsController, getDoctorsBySpecController };
