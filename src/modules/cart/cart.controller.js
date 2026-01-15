const cartService = require("./cart.service");
const asyncHandler = require("../../middleware/asyncHandler");
const { success } = require("../../utils/response");

// POST /api/cart/add
exports.add = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  await cartService.addToCart(req.user.userId, productId, quantity);
  success(res, null, "Product added to cart");
});

// DELETE /api/cart/remove/:productId
exports.remove = asyncHandler(async (req, res) => {
  const productId = Number(req.params.productId);
  await cartService.removeFromCart(req.user.userId, productId);
  success(res, null, "Product removed from cart");
});

// GET /api/cart
exports.get = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user.userId);
  success(res, cart, "Cart retrieved successfully");
});
