const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");

const productsRoutes = require("./routes/products-routes");
const usersRoutes = require("./routes/users-routes");
const ordersRoutes = require("./routes/orders-routes");
const orderItemsRoutes = require("./routes/order-items-routes");
const cartRoutes = require("./routes/cart-routes");
const cartItemsRoutes = require("./routes/cart-items-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/products", productsRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/orderItems", orderItemsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/cartItems", cartItemsRoutes);

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

sequelize
  //.sync({force: true})
  .sync()
  .then((result) => {
    app.listen(5000);
  })
  .catch((error) => {
    console.log(error);
  });
