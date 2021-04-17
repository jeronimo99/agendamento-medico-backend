const dotenv = require('dotenv');
const Doctor = require('../models/doctor');
const { defaultScheduleList } = require('../utils/constants');
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
    res.status(200).json({ doctors });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getScheduleListController = async (req, res, next) => {
  const { id } = req.params;
  const { date } = req.query;

  try {
    const doctor = await Doctor.findOne({ _id: id });

    const dayIndex = doctor.schedules.findIndex(
      (schedule) => schedule.date === date
    );

    if (dayIndex > 0) {
      const scheduleList = defaultScheduleList.filter(
        (schedule) => !doctor.schedules.dayIndex.includes(schedule)
      );
      return res.status(200).json({ scheduleList: scheduleList });
    }

    res.status(200).json({ scheduleList: defaultScheduleList });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const addScheduleController = async (req, res, next) => {
  const { id } = req.params;
  const { date, spec } = req.body;

  try {
    const doctor = await Doctor.findOne({ _id: id });

    const dayIndex = doctor.schedules.findIndex(
      (schedule) => schedule.date === date
    );

    if (dayIndex > 0) {
      const scheduleList = defaultScheduleList.filter(
        (schedule) => !doctor.schedules.dayIndex.includes(schedule)
      );
      return res.status(200).json({ scheduleList: scheduleList });
    }

    res.status(200).json({ scheduleList: defaultScheduleList });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getSpecsController,
  getDoctorsBySpecController,
  getScheduleListController,
  addScheduleController,
};
