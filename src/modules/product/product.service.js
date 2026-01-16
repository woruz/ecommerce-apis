const prisma = require("../../config/prisma");

exports.createProduct = async (data) => {
  try {
    console.log({check: prisma})  
    return await prisma.product.create({
    data
  });
  } catch (error) {
    console.log({error})
  }
};

exports.updateProduct = async (id, data) => {
  return await prisma.product.update({ where: { id: Number(id) }, data });
};

exports.deleteProduct = async (id) => {
  return await prisma.product.delete({ where: { id: Number(id) } });
};

exports.getProduct = async (id) => {
  return await prisma.product.findUnique({ where: { id: Number(id) } });
};

exports.listProducts = async ({ page = 1, limit = 10, categoryId, minPrice, maxPrice }) => {
  page = Number(page);
  limit = Number(limit);

  const where = {};

  if (categoryId) {
    where.categoryId = Number(categoryId);
  }

  if (minPrice || maxPrice) {
    where.price = {};
    if (minPrice) where.price.gte = Number(minPrice);
    if (maxPrice) where.price.lte = Number(maxPrice);
  }

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    items: products,
  };
};
