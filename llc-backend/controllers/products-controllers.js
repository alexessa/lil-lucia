const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Products = require("../models/products");

const getAllProducts = async (req, res, next) => {
  const allProducts = await Products.findAll();

  if (allProducts.length <= 0) {
    return next(new HttpError("Could not find any products", 404));
  }

  res.status(200).json({ products: allProducts });
};

const getProductById = async (req, res, next) => {
  const productId = req.params.pid;
  const foundProduct = await Products.findByPk(productId).catch((err) => {
    return next(new HttpError("Product is not found", 422));
  });

  if (!foundProduct) {
    return next(new HttpError("Product is not found", 422));
  }

  res.status(200).json({ product: foundProduct });
};

const getProductByCategory = async (req, res, next) => {
  const category = req.params.category;
  const foundProduct = await Products.findAll({
    where: { Category: category },
  }).catch((err) => {
    return next(new HttpError("Products are not found", 422));
  });

  if (foundProduct.length <= 0) {
    return next(new HttpError("Products are not found", 422));
  }

  res.status(200).json({ products: foundProduct });
};

const createProduct = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { Name, Description, Price, Category, ImageURL } = req.body;

  const createdProduct = await Products.create({
    Name,
    Description,
    Price,
    Category,
    ImageURL,
  }).catch((err) => {
    next(new HttpError(err.message, 422));
  });

  res.status(201).json({ createdProduct: createdProduct.dataValues });
};

const updateProductById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { Description, Price, Category, ImageURL } = req.body;
  const productId = req.params.pid;

  await Products.update(
    {
      Description: Description,
      Price: Price,
      Category: Category,
      ImageURL: ImageURL,
    },
    { where: { ProductID: productId } }
  ).catch((error) => {
    next(
      new HttpError(
        error.message || "There was an issue updating the entry.",
        422
      )
    );
  });

  res.status(200).json({ message: "Updated parking area successfully!" });
};

const deleteProductById = async (req, res, next) => {
  const productId = req.params.pid;
  const deletedProduct = await Products.findByPk(productId).catch((err) => {
    return next(
      new HttpError("Could not find parking area with the given id", 422)
    );
  });

  if (!deletedProduct) {
    return next(
      new HttpError("Could not find parking area with the given id", 422)
    );
  }

  deletedProduct.destroy();
  res.status(200).json({ message: "Removed Product" });
};

exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.getProductByCategory = getProductByCategory;
exports.createProduct = createProduct;
exports.updateProductById = updateProductById;
exports.deleteProductById = deleteProductById;
