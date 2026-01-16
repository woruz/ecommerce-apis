const productService = require("./product.service");
const { productCreateSchema, productUpdateSchema } = require("./product.schema");
const asyncHandler = require("../../middleware/asyncHandler");
const { success } = require("../../utils/response");

exports.create = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  success(res, product, "Product created successfully", 201);
});

exports.update = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(Number(req.params.id), req.body);
  success(res, product, "Product updated successfully");
});

exports.delete = asyncHandler(async (req, res) => {
  await productService.deleteProduct(Number(req.params.id));
  success(res, null, "Product deleted successfully");
});

exports.get = asyncHandler(async (req, res) => {
  const product = await productService.getProduct(Number(req.params.id));
  if (!product) return success(res, null, "Product not found", 404);
  success(res, product, "Product retrieved successfully");
});

exports.list = asyncHandler(async (req, res) => {
  const products = await productService.listProducts(req.query);
  success(res, products, "Products retrieved successfully");
});
