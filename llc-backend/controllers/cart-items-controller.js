const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const cartItems = require("../models/cart-items");

const getCartItemsByCartID = async (req, res, next) => {
  const cartId = req.params.cid;
  const foundCartItems = await cartItems
    .findAll({
      where: { CartID: cartId },
    })
    .catch((err) => {
      return next(new HttpError("No order items were found", 422));
    });

  if (foundCartItems.length <= 0) {
    return next(new HttpError("No order items were found", 422));
  }

  res.status(200).json({ cartItems: foundCartItems });
};

const createCartItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { CartID, ProductID, Quantity } = req.body;

  const createdCartItem = await cartItems
    .create({
      CartID,
      ProductID,
      Quantity,
    })
    .catch((err) => {
      next(new HttpError(err.message, 422));
    });

  res.status(201).json({ createdCartItem: createdCartItem.dataValues });
};

const updateCartItemById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { Quantity } = req.body;
  const cartItemID = req.params.ciid;

  await cartItems
    .update(
      {
        Quantity: Quantity,
      },
      { where: { CartItemID: cartItemID } }
    )
    .catch((error) => {
      next(
        new HttpError(
          error.message || "There was an issue updating the entry.",
          422
        )
      );
    });

  res.status(200).json({ message: "Updated Order Item successfully!" });
};

const deleteCartItemById = async (req, res, next) => {
  const cartItemId = req.params.ciid;
  const deletedCartItems = await cartItems.findByPk(cartItemId).catch((err) => {
    return next(
      new HttpError("Could not find cart item with the given id", 422)
    );
  });

  if (!deletedCartItems) {
    return next(
      new HttpError("Could not find cart item with the given id", 422)
    );
  }

  deletedCartItems.destroy();
  res.status(200).json({ message: "Removed Cart Item" });
};

const deleteAllCartItems = async (req, res, next) => {
  const cartId = req.params.cid;
  const deletedCartItems = await cartItems
    .findAll({
      where: { CartID: cartId },
    })
    .catch((err) => {
      return next(
        new HttpError("Could not find cart items with the given id", 422)
      );
    });

  if (deletedCartItems.length <= 0) {
    return next(
      new HttpError("Could not find cart items with the given id", 422)
    );
  }

  deletedCartItems.forEach((deletedCartItem) => {
    deletedCartItem.destroy();
  })
  
  res.status(200).json({ message: "Removed Cart Items" });
};

exports.getCartItemsByCartID = getCartItemsByCartID;
exports.createCartItem = createCartItem;
exports.updateCartItemById = updateCartItemById;
exports.deleteCartItemById = deleteCartItemById;
exports.deleteAllCartItems = deleteAllCartItems;
