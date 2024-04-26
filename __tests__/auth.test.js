const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const User = require('../models/users');

describe('Auth endpoints', () => {
  let testUser;

  beforeEach(async () => {
    // Create a test user before each test
    testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password', // Please don't use plain passwords in production!
    });
  });

  afterEach(async () => {
    // Delete the test user after each test
    await User.deleteMany();
  });

  describe('POST /register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'New User',
          email: 'newuser@example.com',
          password: 'password123', // Please don't use plain passwords in production!
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'ok');

      // Additional assertions to ensure the user is created in the database
      const newUser = await User.findOne({ email: 'newuser@example.com' });
      expect(newUser).toBeTruthy();
      expect(newUser.name).toBe('New User');
    });

    it('should return error for duplicate email', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123', // Please don't use plain passwords in production!
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('status', 'error');
      expect(res.body).toHaveProperty('error', 'Duplicate email');
    });
  });
});
