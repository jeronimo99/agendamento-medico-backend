const mongoose = require('mongoose');
// const createServer = require('../../server');
const { DB_URL } = require('../../utils/constants');

beforeEach(async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(() => {
  mongoose.connection.db.dropDatabase(async () => {
    await mongoose.connection.close();
  });
});

// const app = createServer();

test('first test', () => {
  expect(1).toBe(1);
});
