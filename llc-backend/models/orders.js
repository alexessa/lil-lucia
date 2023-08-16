const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const OrderItems = require("./order-items");

const Orders = sequelize.define("orders", {
  OrderID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  OrderDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  TotalAmount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

Orders.hasMany(OrderItems, { foreignKey: 'OrderID' });
OrderItems.belongsTo(Orders, { foreignKey: 'OrderID' });

module.exports = Orders;
