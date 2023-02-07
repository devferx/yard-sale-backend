const request = require('supertest');

const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { upSeed, downSeed } = require('./utils/umzug');

describe('test for /categories path', () => {
  let app = null;
  let server = null;
  /** @type {import('supertest').SuperTest<import('supertest').Test>} */
  let api = null;
  /** @type {string} */
  let accessToken = null;

  beforeAll(async () => {
    app = await createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });

  describe('POST /categories with admin user', () => {
    beforeAll(async () => {
      const user = await models.User.findByPk('1');
      const inputData = {
        email: user.email,
        password: 'admin123',
      };

      const { body: bodyLogin } = await api
        .post('/api/v1/auth/login')
        .send(inputData);

      accessToken = bodyLogin.access_token;
    });

    test('should return 401', async () => {
      const inputData = {
        name: 'Categoria Nueva',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };
      const { statusCode } = await api
        .post(`/api/v1/categories`)
        .send(inputData);
      expect(statusCode).toEqual(401);
    });

    test('should return a new category', async () => {
      const inputData = {
        name: 'Categoria Nueva',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };

      const { statusCode, body } = await api
        .post(`/api/v1/categories`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(inputData);

      expect(statusCode).toEqual(201);

      const category = await models.Category.findByPk(body.id);
      expect(category.name).toEqual(inputData.name);
      expect(category.image).toEqual(inputData.image);
    });

    afterAll(() => {
      accessToken = null;
    });
  });

  describe('POST /categories with admin customer', () => {
    beforeAll(async () => {
      const user = await models.User.findByPk('2');
      const inputData = {
        email: user.email,
        password: 'customer123',
      };

      const { body: bodyLogin } = await api
        .post('/api/v1/auth/login')
        .send(inputData);

      accessToken = bodyLogin.access_token;
    });

    test('should return 401 without token', async () => {
      const inputData = {
        name: 'Categoria Nueva',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };
      const { statusCode } = await api
        .post(`/api/v1/categories`)
        .send(inputData);
      expect(statusCode).toEqual(401);
    });

    test('should return 401 with customer token', async () => {
      const inputData = {
        name: 'Categoria Nueva',
        image: 'https://api.lorem.space/image/game?w=150&h=220',
      };

      const { statusCode } = await api
        .post(`/api/v1/categories`)
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(inputData);

      expect(statusCode).toEqual(401);
    });

    afterAll(() => {
      accessToken = null;
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
