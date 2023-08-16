const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const CartItems = require("./cart-items");
const OrderItems = require("./order-items");

const Products = sequelize.define("products", {
  ProductID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  Category: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  ImageURL: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Products.hasMany(CartItems, { foreignKey: 'ProductID' });
CartItems.belongsTo(Products, { foreignKey: 'ProductID' });

Products.hasMany(OrderItems, { foreignKey: 'ProductID' });
OrderItems.belongsTo(Products, { foreignKey: 'ProductID' });

module.exports = Products;
