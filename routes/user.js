const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

const { registerController, deleteController } = require('../controllers/auth');

router.post(
  '/register',
  body('name').isLength({ min: 4, max: 50 }).isLowercase(),
  body('phone').isLowercase(),
  body('email').isEmail().isLowercase(),
  body('password').isLength({ min: 6, max: 20 }),
  registerController
);

router.post('/delete', deleteController);

module.exports = router;
