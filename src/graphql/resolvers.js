const {
  getProduct,
  getProducts,
  getProductsByCategory,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('./product.resolvers');
const { getCategory, addCategory } = require('./category.resolvers');
const { login } = require('./auth.resolvers');
const { RegularExpression } = require('graphql-scalars');

const CategoryNameType = new RegularExpression(
  'CategoryNameType',
  /^[a-zA-Z0-9]{3,8}$/
);

const resolvers = {
  Query: {
    hello: () => 'Hello world from Apollo Server',
    getPerson: (_, args) =>
      `Hello, my name is ${args.name}, I'm ${args.age} years old`,
    getInt: (_, args) => args.age,
    getFloat: () => Math.random() * 100,
    getString: () => 'Hello world',
    getBoolean: () => Math.random() > 0.5,
    getID: () => '1234567890',
    getNumbers: (_, args) => args.numbers,
    // Products
    product: getProduct,
    products: getProducts,
    // Categories
    category: getCategory,
  },
  Mutation: {
    login,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
  },
  CategoryNameType,
  Category: {
    products: getProductsByCategory,
  },
};

module.exports = resolvers;
