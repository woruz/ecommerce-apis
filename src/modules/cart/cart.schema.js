const { z } = require("zod");

exports.addToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number().min(1),
});

exports.cartParamsSchema = z.object({
 productId: z
    .string()
    .regex(/^\d+$/, { message: "id must be a positive integer" })
    .transform(Number)
});
