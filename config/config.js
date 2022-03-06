require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || process.env.DB_USER_LOCAL,
    password: process.env.DB_PASS || process.env.DB_PASS_LOCAL,
    database: process.env.DB_NAME || process.env.DB_NAME_LOCAL,
    host:     process.env.DB_HOST || process.env.DB_HOST_LOCAL,
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
