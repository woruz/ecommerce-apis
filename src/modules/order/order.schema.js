const { z } = require("zod");

exports.createOrderSchema = z.object({
  // optional if you want to allow placing order from partial cart
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
    }).optional()
  ).optional()
});

exports.listOrderSchema = z.object({
  page: z
    .string()
    .optional()
    .transform(Number)
    .refine((v) => !v || v > 0, { message: "page must be > 0" }),

  limit: z
    .string()
    .optional()
    .transform(Number)
    .refine((v) => !v || v > 0, { message: "limit must be > 0" }),
});