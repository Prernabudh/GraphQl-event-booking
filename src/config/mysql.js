onst Sequelize = require("sequelize");
const databaseConfig = require("./databaseConfig");

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.hostname,
    dialect: "mysql",
  }
);

module.exports = sequelize;
