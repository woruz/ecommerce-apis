const express = require("express");
const { error: sendError } = require("./utils/response");

const app = express();

// Global middleware
app.use(express.json());

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes (will plug modules later)
app.use("/api/auth", require("./modules/auth/auth.routes"));  
app.use("/api/products", require("./modules/product/product.routes"));   
app.use("/api/cart", require("./modules/cart/cart.routes"));
app.use("/api/orders", require("./modules/order/order.routes"));

// Global error handler (placeholder for now)

app.use((err, req, res, next) => {
  console.error({err123: err});

  if (err.name === "ZodError") {
    return sendError(res, "Validation error", 400, err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  sendError(res, message, statusCode);
});

module.exports = app;
