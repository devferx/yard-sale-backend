const { ValidationError } = require('sequelize');
const { config } = require('../config/config');

function logErrors(err, req, res, next) {
  if (config.env === 'dev') {
    console.log(err);
  }

  next(err);
}

function errorHandler(err, req, res) {
  // console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    return res.status(output.statusCode).json(output.payload);
  }

  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }

  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
