const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const tokenSecret = process.env.TOKEN_SECRET;

const requireAuth = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res
        .status(401)
        .json({ error: 'No token found. Could not authenticate.' });
    }

    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, tokenSecret);
    if (!decoded) {
      return res
        .status(401)
        .json({ error: 'Invalid token. Could not authenticate.' });
    }
    req.role = decoded.role;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ error: 'Invalid token. Could not authenticate.' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.role === 'admin') {
    return next();
  }

  return res.status(403).json({ error: 'Unauthorized' });
};

const requireUser = (req, res, next) => {
  if (req.role === 'user') {
    return next();
  }

  return res.status(403).json({ error: 'Unauthorized' });
};

const handleInternalError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: 'Internal server error.' });
};

module.exports = {
  requireAuth,
  requireAdmin,
  requireUser,
  handleInternalError,
};
