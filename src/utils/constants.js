const dotenv = require('dotenv');

dotenv.config();

const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.e9qla.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const defaultScheduleList = [
  '8:00 - 9:00',
  '9:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '16:00 - 17:00',
  '17:00 - 18:00',
];

module.exports = { DB_URL, defaultScheduleList };
