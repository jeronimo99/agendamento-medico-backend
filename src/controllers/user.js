const dotenv = require('dotenv');
const Doctor = require('../models/doctor');
const User = require('../models/user');
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

    const dateIndex = doctor.schedules.findIndex(
      (schedule) => schedule.date === date
    );

    if (dateIndex > -1) {
      const activeSchedules = doctor.schedules[dateIndex].appointments.map(
        (item) => item.appointment
      );

      const scheduleList = defaultScheduleList.filter(
        (item) => !activeSchedules.includes(item)
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
  const { date, schedule } = req.body;

  try {
    const doctor = await Doctor.findOne({ _id: id });
    const scheduleIndex = doctor.schedules.findIndex(
      (schedule) => schedule.date === date
    );

    const user = await User.findOne({ _id: req._id });

    if (scheduleIndex < 0) {
      doctor.schedules.push({
        date: date,
        appointments: [
          {
            userId: req._id,
            appointment: schedule,
            name: user.name,
            phone: user.phone,
            doctor: doctor.name,
            spec: doctor.spec,
          },
        ],
      });
      await doctor.save();
    }

    const userScheduleIndex = user.schedules.findIndex(
      (schedule) => schedule.date === date
    );

    if (userScheduleIndex < 0) {
      user.schedules.push({
        date: date,
        appointments: [
          {
            userId: req._id,
            appointment: schedule,
            name: user.name,
            phone: user.phone,
            doctor: doctor.name,
            spec: doctor.spec,
          },
        ],
      });

      await User.findByIdAndUpdate({ _id: req._id }, user);
      return res.status(200).json({ msg: 'success' });
    }

    const newAppointment = {
      userId: req._id,
      appointment: schedule,
      name: user.name,
      phone: user.phone,
      doctor: doctor.name,
      spec: doctor.spec,
    };

    doctor.schedules[scheduleIndex].appointments.push(newAppointment);
    await Doctor.findByIdAndUpdate({ _id: doctor._id }, doctor);

    user.schedules[userScheduleIndex].appointments.push(newAppointment);
    await User.findByIdAndUpdate({ _id: req._id }, user);

    return res.status(200).json({ msg: 'success' });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getUserSchedules = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req._id });
    const schedules = [];

    user.schedules.map((schedule) => {
      schedule.appointments.map((item) => {
        schedules.push({
          date: schedule.date,
          appointment: item.appointment,
          doctor: item.doctor,
          spec: item.spec,
        });
      });
    });

    res.status(200).json({ schedules: schedules });
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
  getUserSchedules,
};
