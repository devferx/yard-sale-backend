const request = require('supertest');
const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
  res.status(201).json({ name: 'Fernando' });
});

app.listen(9000);

const api = request(app);

describe('test for app', () => {
  test('GET /hello', async () => {
    const response = await api.get('/hello');

    expect(response).toBeTruthy();
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('Fernando');
    expect(response.headers['content-type']).toMatch(/json/);
  });
});
