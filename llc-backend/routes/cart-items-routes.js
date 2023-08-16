const express = require("express");
const { check } = require("express-validator");

const cartItemsController = require("../controllers/cart-items-controller");

const router = express.Router();

router.get("/:cid", cartItemsController.getCartItemsByCartID);

router.post(
  "/",
  [
    check("CartID").not().isEmpty(),
    check("ProductID").not().isEmpty(),
    check("Quantity").not().isEmpty(),
  ],
  cartItemsController.createCartItem
);

router.patch(
    "/",
    [
      check("Quantity").not().isEmpty(),
    ],
    cartItemsController.updateCartItemById
  );

router.delete("/:ciid", cartItemsController.deleteCartItemById);

router.delete("/:cid", cartItemsController.deleteAllCartItems)

module.exports = router;
