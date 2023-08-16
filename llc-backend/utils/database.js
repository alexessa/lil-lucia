const Sequelize = require("sequelize");

const sequelize = new Sequelize("lil_lucia", "admin", "adminPass", {
  //const sequelize = new Sequelize("lil_lucia", "root", "rootPass@123", {
  host: "llcdb.cxmvq8oh8y1x.eu-north-1.rds.amazonaws.com",
  //host: "localhost",
  port: 3306,
  dialect: "mysql"
});

module.exports = sequelize;
