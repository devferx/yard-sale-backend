const {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('./product.resolvers');

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
  },
  Mutation: {
    addProduct,
    updateProduct,
    deleteProduct,
  },
};

module.exports = resolvers;
