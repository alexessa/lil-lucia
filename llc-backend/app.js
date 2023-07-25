const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("could not find this route", 404);
  throw error;
});

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(err.code || 500);
  res.json({ message: err.message || "An unknown error occurred" });
});

var con = mysql.createConnection({
  host: "llc-db.cxmvq8oh8y1x.eu-north-1.rds.amazonaws.com",
  user: "admin",
  password: "adminPass",
  database: "llc_db_table",
});

con.connect(function (err) {
  if (err) throw err;
});

app.listen(3500);
