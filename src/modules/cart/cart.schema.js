const { z } = require("zod");

exports.addToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});
