const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const {
  requireAuth,
  requireAdmin,
  requireUser,
  handleInternalError,
} = require('./middlewares');

function createServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('tiny'));
  app.use(cors());

  app.use('/api/', authRoutes);
  app.use('/api/admin', requireAuth, requireAdmin, adminRoutes);
  app.use('/api/user', requireAuth, requireUser, userRoutes);

  app.use(handleInternalError);

  return app;
}

module.exports = createServer;
