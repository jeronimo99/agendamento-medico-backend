const mongoose = require('mongoose');

const createServer = require('./server');
const { DB_URL } = require('./utils/constants');

const port = process.env.PORT || 5000;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = createServer();

    console.log('Database connected...');
    app.listen(port, () => {
      console.log(`Server started on ${port}...`);
    });
  });
