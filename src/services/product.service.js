const faker = require('faker');
const { Op } = require('sequelize');
const boom = require('@hapi/boom');

const { models } = require('../db/sequelize');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    this.products = new Array(1000).fill(1).map(() => ({
      id: faker.datatype.uuid(),
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
      isBlock: faker.datatype.boolean(),
    }));
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product is block');
    }

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const res = await product.update(changes);
    return res;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

  async getProductsByCategory(id) {
    const products = await models.Product.findAll({
      where: {
        categoryId: id,
      },
    });

    return products;
  }
}

module.exports = ProductsService;
