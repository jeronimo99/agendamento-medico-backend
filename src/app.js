const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan('tiny'));
app.use(cors());

app.use('/', (request, response) => {
  response.send({msg: 'Hello World'});
});

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started...');
});