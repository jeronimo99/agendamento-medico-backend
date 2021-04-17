const { Router } = require('express');
const router = Router();

const {
  getSpecsController,
  getDoctorsBySpecController,
} = require('../controllers/user');

router.get('/specs', getSpecsController);
router.get('/specs/:id/doctors/', getDoctorsBySpecController);

module.exports = router;
