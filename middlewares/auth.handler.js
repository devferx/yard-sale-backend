const { request } = require('express');
const boom = require('@hapi/boom');
const { config } = require('../config/config');

function checkApiKey(req = request, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

module.exports = { checkApiKey };
