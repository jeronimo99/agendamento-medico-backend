const dotenv = require('dotenv');
dotenv.config();

const test = (req, res) => {
  res.status(200).json({ msg: 'ok' });
};

module.exports = { test };
