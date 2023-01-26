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

const addProduct = async (_, { dto }) => {
  const newProduct = await service.create(dto);
  return newProduct;
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
};
