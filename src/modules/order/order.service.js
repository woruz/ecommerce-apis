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
    const itemsToOrder = orderData.items && orderData.items.length > 0
      ? orderData.items
      : cart.items.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
        }));  

    let totalPrice = 0;

    const enrichedItems = [];

    // Check stock for all items
    for (const item of itemsToOrder) {
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.stockQty < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);
      totalPrice += product.price * item.quantity;
      enrichedItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      });
    }

    // Create order
    const order = await tx.order.create({
      data: {
        userId,
        totalPrice,
        status: "PENDING",
        items: {
          create: enrichedItems,
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

exports.getAllOrders = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [orders, total] = await prisma.$transaction([
    prisma.order.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: { id: true, email: true, role: true },
        },
        items: {
          include: {
            product: {
              select: { id: true, name: true },
            },
          },
        },
      },
    }),
    prisma.order.count(),
  ]);

  return {
    items: orders,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};
