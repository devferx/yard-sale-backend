const express = require('express');

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./users.router');
const orderRouter = require('./orders.router');
const customersRouter = require('./customers.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/orders', orderRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;
