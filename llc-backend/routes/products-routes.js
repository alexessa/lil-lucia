const express = require("express");
const { check } = require("express-validator");

const productsController = require("../controllers/products-controllers");

const router = express.Router();

router.get("/", productsController.getAllProducts);

router.get("/:pid", productsController.getProductById);

router.get("/category/:category", productsController.getProductByCategory);

router.post(
  "/",
  [
    check("Name").not().isEmpty(),
    check("Description").isLength({ min: 5 }),
    check("Price").not().isEmpty(),
    check("Category").not().isEmpty(),
  ],
  productsController.createProduct
);

router.patch(
  "/:pid",
  [
    check("Description").isLength({ min: 5 }),
    check("Price").not().isEmpty(),
    check("Category").not().isEmpty(),
    check("ImageURL").not().isEmpty(),
  ],
  productsController.updateProductById
);

router.delete("/:pid", productsController.deleteProductById);

module.exports = router;
