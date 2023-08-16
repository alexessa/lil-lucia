const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Orders = require("./orders");
const Cart = require("./cart");

const Users = sequelize.define("users", {
  UserID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  FirstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  LastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Address: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  Password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  IsAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  }
});

Users.hasMany(Orders, { foreignKey: "CustomerID" });
Orders.belongsTo(Users, { foreignKey: "CustomerID" });

Users.hasMany(Cart, { foreignKey: "UserID" });
Cart.belongsTo(Users, { foreignKey: "UserID" });

module.exports = Users;
