const express = require("express");
const { check } = require("express-validator");

const cartController = require("../controllers/cart-controllers");

const router = express.Router();

router.get("/:uid", cartController.getCartByUser);

router.post("/", [check("UserID").not().isEmpty()], cartController.createCart);

router.delete("/:uid", cartController.deleteCartByUserId);

module.exports = router;
