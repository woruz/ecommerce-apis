const prisma = require("../../config/prisma");

exports.getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }
  return cart;
};

exports.addToCart = async (userId, productId, quantity) => {
  const cart = await exports.getOrCreateCart(userId);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });
  if (!product) throw new Error("Product not found");
  if (product.stockQty < quantity) throw new Error("Insufficient stock");

  return prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
    update: {
      quantity: { increment: quantity },
    },
    create: {
      cartId: cart.id,
      productId,
      quantity,
    },
  });
};

exports.removeFromCart = async (userId, productId) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) return;

  await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });
};

exports.getCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) return { items: [], total: 0 };

  const items = cart.items.map((item) => ({
    productId: item.productId,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    subtotal: item.product.price * item.quantity,
  }));

  const total = items.reduce((sum, i) => sum + i.subtotal, 0);

  return { items, total };
};
