const request = require('supertest');

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('test for /users path', () => {
  let app = null;
  let server = null;
  let api = request(null);

  beforeAll(async () => {
    app = await createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });

  describe('GET /users/{id}', () => {
    test('should return a user', async () => {
      const user = await models.User.findByPk('1');
      const { statusCode, body } = await api.get(`/api/v1/users/${user.id}`);
      expect(statusCode).toEqual(200);
      expect(body.id).toEqual(user.id);
      expect(body.email).toEqual(user.email);
    });
  });

  describe('POST /users', () => {
    test('should return a 400 Bad Request with password invalid', async () => {
      // Arrange
      const inputData = {
        email: 'test@mail.com',
        password: '---',
      };
      // Act
      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/password/);
    });

    test('should return a 400 Bad Request with email invalid', async () => {
      // Arrange
      const inputData = {
        email: '---',
        password: '12345678',
      };
      // Act
      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);
      // Assert
      expect(statusCode).toBe(400);
      expect(body.message).toMatch(/email/);
    });

    test('should return a new user', async () => {
      const inputData = {
        email: 'jhondoe@mail.com',
        password: 'password123',
      };

      const { statusCode, body } = await api
        .post('/api/v1/users')
        .send(inputData);

      expect(statusCode).toBe(201);
      // check db
      const user = await models.User.findByPk(body.id);
      expect(user).toBeTruthy();
      expect(user.role).toEqual('customer');
      expect(user.email).toEqual(inputData.email);
    });
  });

  describe('PUT /users', () => {
    // Test for /users
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
