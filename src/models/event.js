const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/mysql");

const Event = sequelize.define("event", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

(async () => {
  await sequelize.sync();
  // Code here
})();

module.exports = Event;
const User = require("./user");
Event.belongsTo(User, { foreignKey: "userId", as: "creator" });
