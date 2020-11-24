const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const User = sequelize.define("user", {
  userId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = User;
const Event = require("./event");
User.hasMany(Event, { as: "createdEvents", foreignKey: "userId" });
