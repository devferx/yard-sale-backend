const request = require('supertest');

const createApp = require('../src/app');

describe('test for /users path', () => {
  let app = null;
  let server = null;
  let api = request(null);

  beforeEach(async () => {
    app = await createApp();
    server = app.listen(9000);
    api = request(app);
  });

  afterEach(() => {
    server.close();
  });

  describe('GET /users', () => {
    // Test for /users
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
  });

  describe('PUT /users', () => {
    // Test for /users
  });
});
