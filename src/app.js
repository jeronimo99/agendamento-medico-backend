const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const port = process.env.PORT || 5000;
const app = express();
app.use(morgan('tiny'));
app.use(cors());
dotenv.config();

app.use('/', (request, response) => {
  response.send({msg: 'Hello World'});
});

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
