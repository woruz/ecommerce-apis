const prisma = require("../../config/prisma");

exports.placeOrder = async (userId, orderData) => {
  // Start a transaction
  return await prisma.$transaction(async (tx) => {
    // Fetch cart and cart items
    const cart = await tx.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Optional: override items from request body
    const itemsToOrder = orderData.items ?? cart.items.map(i => ({
      productId: i.productId,
      quantity: i.quantity
    }));

    let totalPrice = 0;

    // Check stock for all items
    for (const item of itemsToOrder) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stockQty < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);
      totalPrice += product.price * item.quantity;
    }

    // Create order
    const order = await tx.order.create({
      data: {
        userId,
        totalPrice,
        status: "PENDING",
        items: {
          create: itemsToOrder.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: tx.product.findUnique({ where: { id: item.productId } }).price
          })),
        },
      },
      include: { items: true },
    });

    // Deduct stock
    for (const item of itemsToOrder) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stockQty: { decrement: item.quantity } },
      });
    }

    // Clear user cart
    await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

    return order;
  });
};

exports.getUserOrders = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });
};

exports.getAllOrders = async () => {
  return prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });
};
