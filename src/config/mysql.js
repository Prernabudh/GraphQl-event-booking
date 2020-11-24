const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "admin", "Prerna123", {
  host: "mysqldatabase.c7jgnwjx5ak9.ap-south-1.rds.amazonaws.com",
  dialect: "mysql",
});

module.exports = sequelize;
