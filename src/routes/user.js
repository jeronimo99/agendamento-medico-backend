const { Router } = require('express');
const router = Router();

const {
  getSpecsController,
  getDoctorsBySpecController,
  getScheduleListController,
  addScheduleController,
} = require('../controllers/user');

router.get('/specs', getSpecsController);
router.get('/specs/:id/doctors/', getDoctorsBySpecController);

router.get('/doctors/:id/schedule/', getScheduleListController);
router.post('/doctors/:id/schedule/', addScheduleController);

module.exports = router;
