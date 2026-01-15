const { z } = require("zod");

exports.createOrderSchema = z.object({
  // optional if you want to allow placing order from partial cart
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
    })
  ).optional()
});
