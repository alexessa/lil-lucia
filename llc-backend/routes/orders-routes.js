const express = require("express");
const { check } = require("express-validator");

const ordersController = require("../controllers/orders-controllers");

const router = express.Router();

router.get("/", ordersController.getAllOrders);

router.get("/:oid", ordersController.getOrderById);

router.get("/user/:uid", ordersController.getOrdersByUser);

router.post(
  "/",
  [
    check("UserID").not().isEmpty(),
    check("OrderDate").not().isEmpty(),
    check("TotalAmount").not().isEmpty(),
  ],
  ordersController.createOrder
);

router.patch(
  "/:oid",
  [
    check("TotalAmount").not().isEmpty(),
  ],
  ordersController.updateOrderById
);

router.delete("/:oid", ordersController.deleteOrderById);

module.exports = router;
