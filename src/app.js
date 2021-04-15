const mongoose = require('mongoose');

const createServer = require('./server');

const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e9qla.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    const app = createServer();

    console.log('Database connected...');
    app.listen(port, () => {
      console.log(`Server started on ${port}...`);
    });
  });
