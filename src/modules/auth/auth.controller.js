const authService = require("./auth.service");
const asyncHandler = require("../../middleware/asyncHandler");
const { success } = require("../../utils/response");
const { registerSchema } = require("./auth.schema");


exports.register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  success(res, user, "User registered successfully", 201);
});

exports.login = asyncHandler(async (req, res) => {
  const token = await authService.login(req.body);
  success(res, { token }, "Login successful");
});
