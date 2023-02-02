const request = require('supertest');

const createApp = require('../src/app');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(async () => {
    app = await createApp();
    server = app.listen(9000);
    api = request(app);
  });

  afterEach(() => {
    server.close();
  });

  test('GET /hello', async () => {
    const response = await api.get('/hello');

    expect(response).toBeTruthy();
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Fernando');
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
