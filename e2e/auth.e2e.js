const request = require('supertest');

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = request(null);

  beforeAll(async () => {
    app = await createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });

  afterAll(async () => {
    server.close();
    await downSeed();
  });

  describe('POST /login', () => {
    test('should return a 401', async () => {
      const inputData = {
        email: '---',
        password: 'qopkqwekopweqkopqwe',
      };
      const { statusCode } = await api
        .post('/api/v1/auth/login')
        .send(inputData);

      expect(statusCode).toBe(401);
    });

    test('should return a 200', async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
        password: 'admin123',
      };

      const { statusCode, body } = await api
        .post('/api/v1/auth/login')
        .send(inputData);

      expect(statusCode).toBe(200);
      expect(body.access_token).toBeTruthy();
      expect(body.user.email).toEqual(inputData.email);
      expect(body.user.password).toBeUndefined();
    });
  });
});
