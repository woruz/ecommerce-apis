const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const { authMiddleware, adminMiddleware } = require("../../middleware/auth");     
const validate = require("../../middleware/validate");
const { productCreateSchema, listProductsSchema, productParamsSchema } = require("./product.schema");

// Public routes
router.get("/", validate(listProductsSchema, "query"),  productController.list);
router.get("/:id", validate(productParamsSchema,"params"), productController.get);

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, validate(productCreateSchema), productController.create);    
router.put("/:id", authMiddleware, adminMiddleware, validate(productParamsSchema,"params"), validate(productCreateSchema), productController.update);
router.delete("/:id", authMiddleware, adminMiddleware, validate(productParamsSchema,"params"), productController.delete);

module.exports = router;

