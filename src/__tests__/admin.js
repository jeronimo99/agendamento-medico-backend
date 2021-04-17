const mongoose = require('mongoose');
const supertest = require('supertest');

const createServer = require('../server');
const { DB_URL } = require('../utils/constants');
const Doctor = require('../models/doctor');
const User = require('../models/user');

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

describe('POST /api/admin/doctors', () => {
  beforeEach(async () => {
    await Doctor.deleteMany({ crm: '123456789' });
  });

  test('Add a doctor to database', async () => {
    await supertest(app)
      .post('/api/admin/doctors')
      .send({ name: 'test123', crm: '123456789', spec: 'test123' })
      .set('Authorization', `bearer ${token}`)
      .expect(200);

    await Doctor.deleteMany({ crm: '123456789' });
  });

  test('Should not be possible to add an existent crm', async () => {
    const doctor = new Doctor({
      name: 'test123',
      crm: '123456789',
      spec: 'test123',
    });
    await doctor.save();

    await supertest(app)
      .post('/api/admin/doctors')
      .send({ name: 'test123', crm: '123456789', spec: 'test123' })
      .set('Authorization', `bearer ${token}`)
      .expect(400);
  });

  test('Min name length validation', async () => {
    await supertest(app)
      .post('/api/admin/doctors')
      .send({ name: 'tes', crm: '123456789', spec: 'test123' })
      .set('Authorization', `bearer ${token}`)
      .expect(400);
  });

  test('Max name length validation', async () => {
    await Doctor.deleteMany({ crm: '123456789' });

    await supertest(app)
      .post('/api/admin/doctors')
      .send({
        name:
          'test1234567890123456789012345667890test1234567890123456789012345667890',
        crm: '123456789',
        spec: 'test123',
      })
      .set('Authorization', `bearer ${token}`)
      .expect(400);
  });
});

describe('DELETE /api/admin/doctors/', () => {
  let doctor;

  test('Delete a doctor with success', async () => {
    await Doctor.deleteMany({ crm: '123456789' });

    doctor = new Doctor({
      name: 'test1234',
      crm: '1234567890',
      spec: 'test1234',
    });
    await doctor.save();

    await supertest(app)
      .put(`/api/admin/doctors/`)
      .set('Authorization', `bearer ${token}`)
      .send({ id: doctor.crm })
      .expect(200);

    await Doctor.deleteMany({ crm: '123456789' });
  });

  test('Do not delete an unexistent doctor', async () => {
    await Doctor.deleteMany({ crm: '123456789' });

    await supertest(app)
      .put(`/api/admin/doctors/`)
      .set('Authorization', `bearer ${token}`)
      .send({ id: 123456789 })
      .expect(400);
  });
});

describe('GET /api/patients', () => {
  test('Get all users from database', async () => {
    await User.deleteMany({ email: 'test123@gmail.com' });
    await User.deleteMany({ email: 'test1234@gmail.com' });

    const user1 = new User({
      name: 'test123',
      phone: '123456789',
      email: 'test123@gmail.com',
      password: 'test123',
      role: 'user',
    });
    await user1.save();

    const user2 = new User({
      name: 'test1234',
      spec: '123456789',
      email: 'test1234@gmail.com',
      password: 'test1234',
      role: 'user',
    });
    await user2.save();

    await supertest(app)
      .get('/api/admin/patients')
      .set('Authorization', `bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.patients).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ email: 'test123@gmail.com' }),
            expect.objectContaining({ email: 'test1234@gmail.com' }),
          ])
        );
      });

    await User.deleteMany({ email: 'test123@gmail.com' });
    await User.deleteMany({ email: 'test1234@gmail.com' });
  });
});
