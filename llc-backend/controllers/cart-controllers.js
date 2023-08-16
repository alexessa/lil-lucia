const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Cart = require("../models/cart");

const getCartByUser = async (req, res, next) => {
  const userId = req.params.uid;
  const foundCart = await Cart.findOne({
    where: { UserID: userId },
  }).catch((err) => {
    return next(new HttpError("No carts were found", 422));
  });

  if (!foundCart) {
    return next(new HttpError("No carts were found", 422));
  }

  res.status(200).json({ cart: foundCart });
};

const createCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { UserID } = req.body;

  const createdCart = await Cart.create({
    UserID,
  }).catch((err) => {
    next(new HttpError(err.message, 422));
  });

  res.status(201).json({ createdCart: createdCart.dataValues });
};

const deleteCartByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  const deletedCart = await Cart.findOne({
    where: { UserID: userId },
  }).catch((err) => {
    return next(new HttpError("Could not find cart with the given id", 422));
  });

  if (!deletedCart) {
    return next(new HttpError("Could not find cart with the given id", 422));
  }

  deletedCart.destroy();
  res.status(200).json({ message: "Removed Cart" });
};

exports.getCartByUser = getCartByUser;
exports.createCart = createCart;
exports.deleteCartByUserId = deleteCartByUserId;
