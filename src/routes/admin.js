const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

const {
  getDoctorsController,
  addDoctorController,
  deleteDoctorsController,
  getPatientsController,
  getAppointmentsByDoctorController,
} = require('../controllers/admin');

router.get('/doctors', getDoctorsController);

router.post(
  '/doctors',
  body('name').isLength({ min: 4, max: 50 }).isString(),
  body('crm').isString(),
  body('spec').isString(),
  addDoctorController
);
router.put('/doctors/:id', deleteDoctorsController);

router.get('/patients', getPatientsController);

router.get('/doctors/:id/appointments', getAppointmentsByDoctorController);

module.exports = router;
