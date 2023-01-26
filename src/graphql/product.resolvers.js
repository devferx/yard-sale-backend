const getProduct = (_, { id }) => ({
  id,
  name: 'Product 1',
  price: 100,
  description: 'Description of product 1',
  image: 'https://placeimg.com/640/480/any',
  createdAt: new Date().toISOString(),
});

const getProducts = () => [];

module.exports = {
  getProduct,
  getProducts,
};
