const { Pool } = require('pg');

const { config } = require('../config/config');

const options = {
  connectionString: config.dbUrl,
};

if (config.isProd) {
  options.ssl = { rejectUnauthorized: false };
} else {
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  options.connectionString = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const pool = new Pool(options);

module.exports = pool;
