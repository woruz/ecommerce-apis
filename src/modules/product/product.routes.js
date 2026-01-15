const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const { authMiddleware, adminMiddleware } = require("../../middleware/auth");     
const validate = require("../../middleware/validate");
const { productCreateSchema, listProductsSchema } = require("./product.schema");

// Public routes
router.get("/", validate(listProductsSchema),  productController.list);
router.get("/:id", productController.get);

// Admin-only routes
router.post("/", authMiddleware, adminMiddleware, validate(productCreateSchema), productController.create);  
router.put("/:id", authMiddleware, adminMiddleware, validate(productCreateSchema), productController.update);
router.delete("/:id", authMiddleware, adminMiddleware, productController.delete);

module.exports = router;

