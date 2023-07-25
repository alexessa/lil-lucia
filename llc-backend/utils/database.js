const mysql = require("mysql");

const mysqlConnection = mysql.createConnection({
  host: "llc-db.cxmvq8oh8y1x.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "adminPass",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err){
    console.log("Connection established");
  } else {
    throw err;
  }
});


module.exports = mysqlConnection;