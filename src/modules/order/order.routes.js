const router = require("express").Router();
const { authMiddleware, adminMiddleware } = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const controller = require("./order.controller");
const { createOrderSchema } = require("./order.schema");

// Customers place order from their cart
router.post("/", authMiddleware, validate(createOrderSchema), controller.placeOrder);

// Customers see their orders
router.get("/me", authMiddleware, controller.myOrders);

// Admin sees all orders
router.get("/", authMiddleware, adminMiddleware, controller.allOrders);

module.exports = router;
