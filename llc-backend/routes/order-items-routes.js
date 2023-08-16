const express = require("express");
const { check } = require("express-validator");

const orderItemsController = require("../controllers/order-items-controller");

const router = express.Router();

router.get("/:oid", orderItemsController.getOrderItemsByOrderID);

router.post(
  "/",
  [
    check("OrderID").not().isEmpty(),
    check("ProductID").not().isEmpty(),
    check("Quantity").not().isEmpty(), 
    check("Subtotal").not().isEmpty(), 
  ],
  orderItemsController.createOrderItem
);

router.patch(
  "/:oiid",
  [
    check("Quantity").not().isEmpty(),
    check("Subtotal").not().isEmpty(),
  ],
  orderItemsController.updateOrderItemById
);

router.delete("/:oiid", orderItemsController.deleteOrderItemById);

module.exports = router;
