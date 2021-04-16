const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../server');
const { DB_URL } = require('../utils/constants');
const Doctor = require('../models/doctor');

let token;

beforeAll(async () => {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await supertest(app)
    .post('/api/login')
    .send({
      email: 'admin@gmail.com',
      password: 'admin@gmail.com',
    })
    .expect(200)
    .then((response) => {
      token = response.body.token;
    });
});

afterAll(async () => {
  await await mongoose.connection.close();
});

const app = createServer();

describe('GET /api/admin/doctors', () => {
  test('Get all doctors from database', async () => {
    await Doctor.deleteMany({ crm: '123456789' });
    await Doctor.deleteMany({ crm: '1234567890' });

    const doctor1 = new Doctor({
      name: 'test123',
      crm: '123456789',
      spec: 'test123',
    });
    await doctor1.save();

    const doctor2 = new Doctor({
      name: 'test1234',
      crm: '1234567890',
      spec: 'test1234',
    });
    await doctor2.save();

    await supertest(app)
      .get('/api/admin/doctors')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.doctors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ crm: '123456789' }),
            expect.objectContaining({ crm: '1234567890' }),
          ])
        );
      });

    await Doctor.deleteMany({ crm: '123456789' });
    await Doctor.deleteMany({ crm: '1234567890' });
  });
});
