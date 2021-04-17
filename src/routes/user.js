const { Router } = require('express');
const router = Router();

const {
  getSpecsController,
  getDoctorsBySpecController,
  getScheduleListController,
} = require('../controllers/user');

router.get('/specs', getSpecsController);
router.get('/specs/:id/doctors/', getDoctorsBySpecController);

router.get('/doctors/:id/schedule/', getScheduleListController);

module.exports = router;
