const request = require('supertest');

const createApp = require('../src/app');
const { config } = require('../src/config/config');

describe('test for app', () => {
  let app = null;
  let server = null;
  /**
   * @type {import('supertest').SuperTest<import('supertest').Test>}
   */
  let api = null;

  beforeAll(async () => {
    app = await createApp();
    server = app.listen(9000);
    api = request(app);
  });

  afterAll(() => {
    server.close();
  });

  test('GET /hello', async () => {
    const response = await api.get('/hello');

    expect(response).toBeTruthy();
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Fernando');
    expect(response.headers['content-type']).toMatch(/json/);
  });

  describe('GET /nueva-ruta', () => {
    test('Should return 401', async () => {
      const { statusCode } = await api.get('/nueva-ruta');

      expect(statusCode).toEqual(401);
    });

    test('Should return 401 with invalid apiKey', async () => {
      const { statusCode } = await api.get('/nueva-ruta').set({ api: '1212' });
      expect(statusCode).toEqual(401);
    });

    test('Should return 200', async () => {
      const { statusCode } = await api
        .get('/nueva-ruta')
        .set({ api: config.apiKey });
      expect(statusCode).toEqual(200);
    });
  });
});
