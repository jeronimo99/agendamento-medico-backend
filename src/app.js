const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('../routes/auth');
const adminRoutes = require('../routes/admin');
const userRoutes = require('../routes/user');
const {
  requireAuth,
  requireAdmin,
  requireUser,
  handleInternalError,
} = require('../middlewares');

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(cors());
dotenv.config();

app.use('/api/', authRoutes);
app.use('/api/admin', requireAuth, requireAdmin, adminRoutes);
app.use('/api/user', requireAuth, requireUser, userRoutes);

app.use(handleInternalError);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e9qla.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Database connected...');
    app.listen(port, () => {
      console.log(`Server started on ${port}...`);
    });
  });
