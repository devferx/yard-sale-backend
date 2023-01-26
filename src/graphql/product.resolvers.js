const ProductsService = require('../services/product.service');
const service = new ProductsService();

const getProduct = (_, { id }) => service.findOne(id);

const getProducts = () => service.find({});

const addProduct = (_, { dto }) => service.create(dto);

const updateProduct = (_, { id, dto }) => service.update(id, dto);

const deleteProduct = async (_, { id }) => {
  await service.delete(id);
  return id;
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
