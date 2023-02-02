const express = require('express');
const faker = require('faker');

const ProductsService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('../dtos/product.dto');

const router = express.Router();
const service = new ProductsService();

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res) => {
    const products = await service.find(req.query);
    res.json(products);
  }
);

router.post('/generate', () => {
  const products = new Array(50).fill(1).map(() => ({
    name: faker.commerce.productName(),
    price: parseInt(faker.commerce.price(), 10),
    description: faker.lorem.paragraph(),
    image: faker.image.imageUrl(),
    categoryId: 1,
  }));
  products.forEach(async (product) => {
    await service.create(product);
  });
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);

    res.status(201).json(product);
  }
);

router.put(
  '/:id',
  [
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
  ],
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    const product = await service.update(id, body);

    res.json(product);
  }
);

router.patch(
  '/:id',
  [
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
  ],
  async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;

      const product = await service.update(id, body);

      res.json(product);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const resp = await service.delete(id);

    res.json(resp);
  }
);

module.exports = router;
