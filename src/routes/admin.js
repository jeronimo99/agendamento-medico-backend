const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

const {
  getDoctorsController,
  getSpecsController,
  addDoctorController,
  deleteDoctorsController,
  getPatientsController,
} = require('../controllers/admin');

router.get('/doctors', getDoctorsController);
router.get('/doctors/specs', getSpecsController);
router.post(
  '/doctors',
  body('name').isLength({ min: 4, max: 50 }).isString(),
  body('crm').isString(),
  body('spec').isString(),
  addDoctorController
);
router.delete('/doctors/:id', deleteDoctorsController);

router.get('/patients', getPatientsController);

module.exports = router;
