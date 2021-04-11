const { Router } = require('express');
const router = Router();

const { test } = require('../controllers/admin');

router.get('/', test);

module.exports = router;
