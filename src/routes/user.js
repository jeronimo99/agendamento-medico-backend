const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

const {
  registerController,
  loginController,
  deleteController,
} = require('../controllers/auth');

router.post(
  '/register',
  body('name').isLength({ min: 4, max: 50 }),
  body('phone'),
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 20 }),
  registerController
);

router.post(
  '/login',
  body('email').isEmail().isLowercase(),
  body('password').isLength({ min: 6, max: 20 }),
  loginController
);

router.post('/delete', deleteController);

module.exports = router;
