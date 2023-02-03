const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const setupModels = require('./models');

const options = {
  dialect: 'postgres',
  logging: config.env === 'dev' ? console.log : false,
};

if (config.isProd) {
  options.dialectOptions = {
    ssl: { rejectUnauthorized: false },
  };
}

// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

// Lee los modelos y comienza a crear las tablas
// Es muy delicado y no se aconseja utilizar en Producción
// Debido a que esta sobreescribiendo la base de datos
// sequelize.sync();

module.exports = sequelize;
