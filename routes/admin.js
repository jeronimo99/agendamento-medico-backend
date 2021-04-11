const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

const {
  getDoctorsController,
  addDoctorController,
  deleteDoctorsController,
} = require('../controllers/admin');

router.get('/doctors', getDoctorsController);
router.post(
  '/doctors',
  body('name').isLength({ min: 4, max: 50 }).isString(),
  body('crm').isString(),
  body('spec').isString(),
  addDoctorController
);
router.delete('/doctors/:id', deleteDoctorsController);

module.exports = router;
