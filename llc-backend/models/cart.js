const Sequelize = require("sequelize");

const CartItems = require("./cart-items");
const sequelize = require("../utils/database");

const Cart = sequelize.define("cart", {
  CartID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Cart.hasMany(CartItems, { foreignKey: 'CartID' });
CartItems.belongsTo(Cart, { foreignKey: 'CartID' });

module.exports = Cart;
