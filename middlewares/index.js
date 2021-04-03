const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET;

const protectedRoute = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(400)
        .json({ error: 'No token found. Could not authenticate.' });
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, tokenSecret);
    if (!decoded) {
      return res
        .status(400)
        .json({ error: 'Invalid token. Could not authenticate.' });
    }
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ error: 'Invalid token. Could not authenticate.' });
  }
};

const handleInternalError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Internal server error.' });
};

module.exports = { protectedRoute, handleInternalError };
