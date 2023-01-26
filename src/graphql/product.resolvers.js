const ProductsService = require('../services/product.service');
const service = new ProductsService();

const getProduct = async (_, { id }) => {
  const product = service.findOne(id);
  return product;
};

const getProducts = async () => {
  const products = await service.find({});
  return products;
};

module.exports = {
  getProduct,
  getProducts,
};
