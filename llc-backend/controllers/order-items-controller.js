const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const orderItems = require("../models/order-items");

const getOrderItemsByOrderID = async (req, res, next) => {
  const orderId = req.params.oid;
  const foundOrderItems = await orderItems.findAll({
    where: { OrderID: orderId },
  }).catch((err) => {
    return next(new HttpError("No order items were found", 422));
  });

  if (foundOrderItems.length <= 0) {
    return next(new HttpError("No order items were found", 422));
  }

  res.status(200).json({ orderItems: foundOrderItems });
};

const createOrderItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { OrderID, ProductID, Quantity, Subtotal } = req.body;

  const createdOrderItem = await orderItems.create({
    OrderID,
    ProductID,
    Quantity,
    Subtotal
  }).catch((err) => {
    next(new HttpError(err.message, 422));
  });

  res.status(201).json({ createdOrderItem: createdOrderItem.dataValues });
};

const updateOrderItemById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { Quantity, Subtotal } = req.body;
  const OrderItemID = req.params.oiid;

  await orderItems.update(
    {
        Quantity: Quantity,
        Subtotal: Subtotal,
    },
    { where: { OrderItemID: OrderItemID } }
  ).catch((error) => {
    next(
      new HttpError(
        error.message || "There was an issue updating the entry.",
        422
      )
    );
  });

  res.status(200).json({ message: "Updated Order Item successfully!" });
};

const deleteOrderItemById = async (req, res, next) => {
  const orderItemId = req.params.oiid;
  const deletedOrderItems = await orderItems.findByPk(orderItemId).catch((err) => {
    return next(
      new HttpError("Could not find order item with the given id", 422)
    );
  });

  if (!deletedOrderItems) {
    return next(
      new HttpError("Could not find order item with the given id", 422)
    );
  }

  deletedOrderItems.destroy();
  res.status(200).json({ message: "Removed Order Item" });
};

exports.getOrderItemsByOrderID = getOrderItemsByOrderID;
exports.createOrderItem = createOrderItem;
exports.updateOrderItemById = updateOrderItemById;
exports.deleteOrderItemById = deleteOrderItemById;
