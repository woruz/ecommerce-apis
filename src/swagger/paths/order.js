/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and checkout
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Place an order from the current user's cart
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 example: "Please deliver between 9-12 AM"
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Cart empty or insufficient stock
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders/me:
 *   get:
 *     summary: Get logged-in user's order history
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
