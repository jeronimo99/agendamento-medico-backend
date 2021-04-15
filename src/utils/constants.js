const dotenv = require('dotenv');

dotenv.config();

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e9qla.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

module.exports = { DB_URL };
