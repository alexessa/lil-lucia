const express = require("express");
const { check } = require("express-validator");

const productsController = require("../controllers/products-controllers");

const router = express.Router();

router.get("/:pid", productsController.getProductById);

router.get("/baker/:uid", productsController.getProductsByBakerId);

router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("price").not().isEmpty(),
  ],
  productsController.createProduct
);

router.patch(
  "/:pid",
  [check("description").isLength({ min: 5 }), check("price").not().isEmpty()],
  productsController.updateProductById
);

router.delete("/:pid", productsController.deleteProductById);

module.exports = router;
