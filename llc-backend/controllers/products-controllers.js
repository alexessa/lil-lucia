const uuid = require("uuid");
const uuid4 = uuid.v4();
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_PRODUCTS = [
  {
    id: "p1",
    name: "Butterscotch Sponge Cake",
    description:
      "Indulge your friends and family with this luscious butterscotch cake recipe",
    price: 22.99,
    baker: "ll1",
  },
];

const getProductById = (req, res, next) => {
  const productId = req.params.pid;
  const product = DUMMY_PRODUCTS.find((p) => {
    return p.id === productId;
  });

  if (!product) {
    throw new HttpError("Could not find product with provided id.", 404);
  }

  res.json({ product });
};

const getProductsByBakerId = (req, res, next) => {
  const userId = req.params.uid;
  const products = DUMMY_PRODUCTS.filter((p) => {
    return p.baker === userId;
  });

  if (!products || products.length === 0) {
    return next(new HttpError("Could not find product with provided id.", 404));
  }

  res.json({ products });
};

const createProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { name, description, price, baker } = req.body;
  const createdProduct = {
    id: uuid4,
    name,
    description,
    price,
    baker,
  };

  DUMMY_PRODUCTS.push(createdProduct);

  res.status(201).json({ product: createdProduct });
};

const updateProductById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { description, price } = req.body;
  const productId = req.params.pid;

  const updatedProduct = { ...DUMMY_PRODUCTS.find((p) => p.id === productId) };
  const productIndex = DUMMY_PRODUCTS.findIndex((p) => p.id === productId);
  updatedProduct.description = description;
  updatedProduct.price = price;

  DUMMY_PRODUCTS[productIndex] = updatedProduct;

  res.status(200).json({ product: updatedProduct });
};

const deleteProductById = (req, res, next) => {
  const productId = req.params.pid;
  if (!DUMMY_PRODUCTS.filter((p) => p.id !== productId)){
    throw new HttpError("Couldn't find the product with id", 404);
  }
  DUMMY_PRODUCTS = DUMMY_PRODUCTS.filter((p) => p.id !== productId);

  res.status(200).json({ message: "removed product" });
};

exports.getProductById = getProductById;
exports.getProductsByBakerId = getProductsByBakerId;
exports.createProduct = createProduct;
exports.updateProductById = updateProductById;
exports.deleteProductById = deleteProductById;
