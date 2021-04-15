const { Router } = require('express');
const { body } = require('express-validator');
const router = Router();

const { registerController } = require('../controllers/auth');

router.post(
  '/user/register',
  body('username').isEmail().isLowercase(),
  body('password').isLength({ min: 6, max: 20 }),
  registerController
);
router.post(
  '/user/delete',
  body('username').isEmail().isLowercase(),
  body('password').isLength({ min: 6, max: 20 }),
  registerController
);

module.exports = router;
