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
    hello: String
    getPerson(name: String, age: Int): String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    getPerson: (_, args) =>
      `Hello, my name is ${args.name}, I'm ${args.age} years old`,
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
