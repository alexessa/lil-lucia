const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const OrderItems = sequelize.define("orders_items", {
  OrderItemID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  OrderID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  ProductID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  Subtotal: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = OrderItems;
