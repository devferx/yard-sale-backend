const { ApolloServer } = require('@apollo/server');
const {
  ApolloServerPluginLandingPageProductionDefault,
  ApolloServerPluginLandingPageLocalDefault,
} = require('@apollo/server/plugin/landingPage/default');
const { expressMiddleware } = require('@apollo/server/express4');
const { loadFiles } = require('@graphql-tools/load-files');
const { buildContext } = require('graphql-passport');
const {
  typeDefs: scalarsTypeDefs,
  resolvers: scalarsResolver,
} = require('graphql-scalars');

const resolvers = require('./resolvers');

const useGraphQL = async (app) => {
  const typeDefs = [
    ...(await loadFiles('./src/**/*.graphql')),
    scalarsTypeDefs,
  ];
  const allResolvers = [resolvers, scalarsResolver];
  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault(),
    ],
  });

  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: ({ req, res }) => buildContext({ req, res }),
    })
  );
};

module.exports = {
  useGraphQL,
};
