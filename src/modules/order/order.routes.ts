import { Router } from "express";
import { PurchaseController } from "./order.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

export const orderRoutes = Router();

/**
 * @openapi
 * /api/orders:
 *   post:
 *     tags: [Orders]
 *     summary: Place an order from the current basket
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Basket is empty
 *       401:
 *         description: Unauthorized
 */
orderRoutes.post("/", authMiddleware, PurchaseController.create);

/**
 * @openapi
 * /api/orders:
 *   get:
 *     tags: [Orders]
 *     summary: List all orders for the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Orders returned
 *       401:
 *         description: Unauthorized
 */
orderRoutes.get("/", authMiddleware, PurchaseController.getOrders);

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Fetch a single order by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order returned
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
orderRoutes.get("/:id", authMiddleware, PurchaseController.getById);

/**
 * @openapi
 * /api/orders/{id}/status:
 *   put:
 *     tags: [Orders]
 *     summary: Change the status of an order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [CREATED, PAID, SHIPPED, DELIVERED, CANCELLED]
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
orderRoutes.put("/:id/status", authMiddleware, PurchaseController.updateStatus);

/**
 * @openapi
 * /api/orders/{id}/cancel:
 *   put:
 *     tags: [Orders]
 *     summary: Cancel an order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled
 *       400:
 *         description: Order cannot be cancelled at this stage
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
orderRoutes.put("/:id/cancel", authMiddleware, PurchaseController.cancel);
