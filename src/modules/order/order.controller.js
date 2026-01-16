const orderService = require("./order.service");
const { createOrderSchema } = require("./order.schema");
const asyncHandler = require("../../middleware/asyncHandler");
const { success } = require("../../utils/response");

// POST /api/orders
exports.placeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.placeOrder(req.user.userId, req.body);
  success(res, order, "Order placed successfully", 201);
});

// GET /api/orders/me
exports.myOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getUserOrders(req.user.userId);
  success(res, orders, "User orders retrieved successfully");
});

// GET /api/orders (admin)
exports.allOrders = asyncHandler(async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const result = await orderService.getAllOrders({ page, limit });

  success(res, result, "Orders fetched successfully");
});
