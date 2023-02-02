const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');
const { useGraphQL } = require('./graphql');
const { checkApiKey } = require('./middlewares/auth.handler');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const createApp = async () => {
  const app = express();
  app.use(express.json());

  const whiteList = [
    'http://localhost:3000',
    'https://studio.apollographql.com',
  ];
  const options = {
    origin: (origin, callback) => {
      if (whiteList.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS :)'));
      }
    },
  };

  app.use(cors(options));

  require('./utils/auth');

  app.get('/', (req, res) => {
    res.send('Hola mi server en express');
  });

  app.get('/hello', (req, res) => {
    res.status(200).json({
      name: 'Fernando',
    });
  });

  app.get('/nueva-ruta', checkApiKey, (req, res) => {
    res.send('Hola, soy una nueva ruta');
  });

  routerApi(app);
  await useGraphQL(app);

  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
