const request = require('supertest');
const express = require('express');

describe('test for app', () => {
  let app = null;
  let server = null;
  let api = null;

  beforeEach(() => {
    app = express();

    app.get('/hello', (req, res) => {
      res.status(200).json({ name: 'Fernando' });
    });

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
