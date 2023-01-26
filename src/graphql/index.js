const { ApolloServer } = require('@apollo/server');
const {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} = require('@apollo/server/plugin/landingPage/default');
const { expressMiddleware } = require('@apollo/server/express4');

// Get = Query
// POST, PUT, DELETE = Mutation
const typeDefs = `
  type Query {
    hello: String!
    getPerson(name: String, age: Int): String
    getInt(age: Int!): Int
    getFloat: Float
    getString: String
    getBoolean: Boolean
    getID: ID
    getNumbers(numbers: [Int!]!): [Int]
  }
`;

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
  },
};

const useGraphQL = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
  });

  await server.start();

  app.use('/graphql', expressMiddleware(server));
};

module.exports = {
  useGraphQL,
};
