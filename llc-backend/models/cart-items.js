const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const CartItems = sequelize.define("cart_items", {
  CartItemID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  CartID: {
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
});

module.exports = CartItems;
