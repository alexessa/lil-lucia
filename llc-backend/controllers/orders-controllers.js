const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Orders = require("../models/orders");

const getAllOrders = async (req, res, next) => {
  const allOrders = await Orders.findAll();

  if (allOrders.length <= 0) {
    return next(new HttpError("Could not find any orders", 404));
  }

  res.status(200).json({ orders: allOrders });
};

const getOrdersByUser = async (req, res, next) => {
  const userId = req.params.uid;
  const foundOrders = await Orders.findAll({
    where: { UserID: userId },
  }).catch((err) => {
    return next(new HttpError("No orders were found", 422));
  });

  if (foundOrders.length <= 0) {
    return next(new HttpError("No orders were found", 422));
  }

  res.status(200).json({ orders: foundOrders });
};

const getOrderById = async (req, res, next) => {
  const orderId = req.params.oid;
  const foundOrder = await Orders.findByPk(orderId).catch((err) => {
    return next(new HttpError("Order is not found", 422));
  });

  if (!foundOrder) {
    return next(new HttpError("Order is not found", 422));
  }

  res.status(200).json({ order: foundOrder });
};

const createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { UserID, OrderDate, TotalAmount } = req.body;

  const createdOrder = await Orders.create({
    UserID,
    OrderDate,
    TotalAmount,
  }).catch((err) => {
    next(new HttpError(err.message, 422));
  });

  res.status(201).json({ createdOrder: createdOrder.dataValues });
};

const updateOrderById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  const { TotalAmount } = req.body;
  const orderId = req.params.oid;

  await Orders.update(
    {
      TotalAmount: TotalAmount,
    },
    { where: { OrderID: orderId } }
  ).catch((error) => {
    next(
      new HttpError(
        error.message || "There was an issue updating the entry.",
        422
      )
    );
  });

  res.status(200).json({ message: "Updated order successfully!" });
};

const deleteOrderById = async (req, res, next) => {
  const orderId = req.params.oid;
  const deletedOrder = await Orders.findByPk(orderId).catch((err) => {
    return next(
      new HttpError("Could not find order with the given id", 422)
    );
  });

  if (!deletedOrder) {
    return next(
      new HttpError("Could not find order with the given id", 422)
    );
  }

  deletedOrder.destroy();
  res.status(200).json({ message: "Removed Product" });
};

exports.getAllOrders = getAllOrders;
exports.getOrdersByUser = getOrdersByUser;
exports.getOrderById = getOrderById;
exports.createOrder = createOrder;
exports.updateOrderById = updateOrderById;
exports.deleteOrderById = deleteOrderById;
