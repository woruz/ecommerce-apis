const { z } = require("zod");

// For creating/updating products
const productCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  stockQty: z.number().int().nonnegative(),
  categoryId: z.number().optional(),
}); 

const listProductsSchema = z.object({
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

  categoryId: z
    .string()
    .optional()
    .transform(Number)
    .refine((v) => !v || v > 0, { message: "categoryId must be > 0" }),

  minPrice: z
    .string()
    .optional()
    .transform(Number)
    .refine((v) => !v || v >= 0, { message: "minPrice must be >= 0" }),

  maxPrice: z
    .string()
    .optional()
    .transform(Number)
    .refine((v) => !v || v >= 0, { message: "maxPrice must be >= 0" }),
});

const productParamsSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "id must be a positive integer" })
    .transform(Number),
});
module.exports = { productCreateSchema, listProductsSchema, productParamsSchema };
